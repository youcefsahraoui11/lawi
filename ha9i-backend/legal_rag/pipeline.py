from legal_rag.retriever import LegalRetriever
from legal_rag.generator import ask_llm
from legal_rag.prompt_builder import build_legal_prompt
from legal_rag.vision_audio_utils import transcribe_audio, extract_text_from_image

class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

# Initialize retriever globally so it loads FAISS once
try:
    retriever = LegalRetriever()
except Exception as e:
    print(f"{Colors.RED}Failed to initialize LegalRetriever: {e}{Colors.RESET}")
    retriever = None

def run_legal_rag_pipeline(text: str = None, audio_path: str = None, image_path: str = None, conversation_history: list = None) -> dict:
    """
    Main entry point for the Legal RAG.
    Can accept text, an audio file (Whisper), or an image (OCR).
    """
    print(f"\n{Colors.CYAN}{Colors.BOLD}🚀 STARTING LEGAL RAG PIPELINE{Colors.RESET}")
    
    query = ""
    
    # 1. Process inputs
    if audio_path:
        print(f"  {Colors.YELLOW}🎙️ Processing Audio Input...{Colors.RESET}")
        audio_text = transcribe_audio(audio_path)
        if audio_text:
            query += f"{audio_text}\n"
            
    if image_path:
        print(f"  {Colors.YELLOW}📸 Processing Image Input...{Colors.RESET}")
        image_text = extract_text_from_image(image_path)
        if image_text:
            query += f"[Image Text Context]: {image_text}\n"
            
    if text:
        query += f"{text}\n"
        
    query = query.strip()
    
    if not query:
        return {"answer": "No input provided or failed to extract text from audio/image.", "sources": []}
        
    print(f"  {Colors.GREEN}❓ FINAL QUERY:{Colors.RESET} {query}")

    # 2. Retrieval
    if not retriever:
        return {"answer": "System Error: Vector database not loaded. Please run ingest.py first.", "sources": []}
        
    print(f"\n{Colors.CYAN}[STEP 1: RETRIEVAL]{Colors.RESET} Searching legal database...")
    results = retriever.search(query, top_k=5)
    
    if not results:
        return {"answer": "Je suis désolé, mais je n'ai trouvé aucun article de loi correspondant à votre question dans ma base de données.", "sources": []}
        
    print(f"  {Colors.GREEN}✅ Found {len(results)} relevant legal chunks.{Colors.RESET}")
    sources = [doc.metadata.get("citation", "Source Inconnue") for doc in results]
    sources = list(set(sources)) # Deduplicate
    
    # 3. Prompt Construction
    print(f"\n{Colors.CYAN}[STEP 2: PROMPT CONSTRUCTION]{Colors.RESET}")
    prompt = build_legal_prompt(query, results, conversation_history)
    
    # 4. Generation
    print(f"\n{Colors.CYAN}[STEP 3: GENERATION]{Colors.RESET} Asking LLM...")
    answer = ask_llm(prompt)
    
    print(f"\n{Colors.GREEN}🎉 SUCCESS! Returning legal answer.{Colors.RESET}\n")
    return {
        "answer": answer,
        "sources": sources
    }
