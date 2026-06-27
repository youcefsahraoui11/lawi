import os
import re
from google import genai
from google.genai import types

def generate_offline_rag_response(prompt: str) -> str:
    # Find all sources in the prompt
    # Sources look like: --- SOURCE 1 : ... --- \n [content] \n\n
    sources = re.findall(r"--- SOURCE \d+ : (.*?) ---\n(.*?)(?=\n\n---|\n\nUSER QUESTION:)", prompt, re.DOTALL)
    
    # Check language of query to respond in appropriate language
    # We can search for the USER QUESTION block
    query_match = re.search(r"USER QUESTION:\n(.*?)\n\n", prompt, re.DOTALL)
    query = query_match.group(1) if query_match else ""
    
    # Detect language of query (very simple check: if any Arabic character, it's Arabic/Darija)
    is_arabic = any(u'\u0600' <= c <= u'\u06FF' for c in query)
    
    if is_arabic:
        response = "🤖 **المساعد القانوني (وضع عدم الاتصال)**:\n"
        response += "لم يتم إعداد مفتاح API الخاص بـ Gemini (`GEMINI_API_KEY`). ومع ذلك، تم العثور على النصوص القانونية التالية المتعلقة بسؤالك في قاعدة البيانات:\n\n"
        if not sources:
            response += "لم يتم العثور على أي نصوص قانونية مطابقة لسؤالك."
        for i, (source_name, content) in enumerate(sources):
            response += f"⚖️ **المصدر {i+1}: {source_name}**\n```\n{content.strip()}\n```\n\n"
        response += "*ملاحظة: للحصول على إجابات مفصلة ومصاغة بواسطة الذكاء الاصطناعي، يرجى تهيئة مفتاح GEMINI_API_KEY في ملف البيئة.*"
    else:
        response = "🤖 **Assistant Juridique (Mode hors-ligne)**:\n"
        response += "La clé API Gemini (`GEMINI_API_KEY`) n'est pas configurée. Cependant, voici les articles de lois correspondants trouvés dans la base de données :\n\n"
        if not sources:
            response += "Aucun document correspondant n'a été trouvé."
        for i, (source_name, content) in enumerate(sources):
            response += f"⚖️ **Source {i+1}: {source_name}**\n```\n{content.strip()}\n```\n\n"
        response += "*Note: Pour obtenir une réponse synthétisée par l'IA, veuillez configurer la variable d'environnement GEMINI_API_KEY.*"
        
    return response

def ask_llm(prompt: str) -> str:
    """
    Sends the prompt to Google Gemini API using the official google-genai SDK.
    If GEMINI_API_KEY is not set or is a mock key, falls back to a formatted offline RAG response.
    """
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key or api_key.lower() in ("dummy", "mock", "placeholder"):
            print("WARNING: GEMINI_API_KEY is not set or is a mock key. Generating offline formatted RAG response.")
            return generate_offline_rag_response(prompt)
            
        client = genai.Client(api_key=api_key)
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction="You are a helpful legal assistant specializing in Algerian law.",
                temperature=0.2, # Keep temperature low for factual legal QA
                max_output_tokens=1024
            )
        )
        
        return response.text.strip()
        
    except Exception as e:
        print(f"Gemini LLM Error: {e}")
        # If there's an API key error (e.g. 400 INVALID_ARGUMENT, 403, or invalid key)
        # let's fallback to offline RAG response instead of failing!
        err_str = str(e)
        if any(keyword in err_str or keyword in err_str.lower() for keyword in ("API key not valid", "API_KEY_INVALID", "400 INVALID_ARGUMENT", "403", "api key", "invalid key")):
            print("WARNING: Detected invalid API key in exception. Falling back to offline formatted RAG response.")
            return generate_offline_rag_response(prompt)
            
        return f"IMPOSSIBLE: LLM backend error - Details: {e}"