import os
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from legal_rag.config import VECTOR_DB_PATH
from legal_rag.embeddings import get_embeddings

def build_and_save_vector_db(documents: list[Document]):
    print("Building FAISS index...")
    embeddings = get_embeddings()
    vector_db = FAISS.from_documents(documents, embeddings)
    
    os.makedirs(VECTOR_DB_PATH, exist_ok=True)
    vector_db.save_local(VECTOR_DB_PATH)
    print(f"Vector DB successfully saved to {VECTOR_DB_PATH}")

def load_vector_db() -> FAISS:
    embeddings = get_embeddings()
    if not os.path.exists(os.path.join(VECTOR_DB_PATH, "index.faiss")):
        raise FileNotFoundError(f"Vector database not found at {VECTOR_DB_PATH}. Run ingest first.")
    
    print("Loading existing FAISS index...")
    return FAISS.load_local(
        VECTOR_DB_PATH, 
        embeddings, 
        allow_dangerous_deserialization=True
    )
