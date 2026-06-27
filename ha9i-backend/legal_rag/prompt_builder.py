def build_legal_prompt(query: str, context_docs: list, history: list = None) -> str:
    """
    Builds a prompt instructing the LLM to answer the legal query based ONLY on context.
    It forces the LLM to answer in the same language as the query (French, Arabic, or Darija).
    """
    
    # Format the context
    context_text = ""
    for i, doc in enumerate(context_docs):
        law_name = doc.metadata.get("law_name", "Loi Inconnue")
        article = doc.metadata.get("article_number", "")
        citation = doc.metadata.get("citation", f"{law_name} - Article {article}")
        
        context_text += f"--- SOURCE {i+1} : {citation} ---\n{doc.page_content}\n\n"
        
    # Format history
    history_text = ""
    if history:
        history_text = "CONVERSATION HISTORY:\n" + "\n".join(history) + "\n\n"
        
    prompt = f"""You are an expert Algerian Legal Assistant.
Your task is to answer the user's question based strictly on the provided legal texts.

CRITICAL INSTRUCTIONS:
1. You MUST answer in the EXACT SAME LANGUAGE as the user's question (e.g., if the user speaks Arabic, answer in Arabic. If they speak Darija/Algerian dialect, answer in Darija. If French, answer in French).
2. If the user's question is in Arabic or Darija, TRANSLATE the relevant legal context from French to Arabic/Darija in your answer.
3. You MUST cite the exact "Law Name" and "Article Number" when providing facts (e.g. "Selon l'article 54 du Code Civil...").
4. If the provided context does not contain the answer, you MUST clearly state that you do not have the information in the provided legal documents. Do not invent laws.

{history_text}
LEGAL CONTEXT (Usually in French):
{context_text}

USER QUESTION:
{query}

LEGAL ANSWER:
"""
    return prompt
