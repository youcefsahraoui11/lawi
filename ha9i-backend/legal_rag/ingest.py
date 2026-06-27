import json
import os
import sys
from langchain_core.documents import Document

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from legal_rag.config import DATASET_PATH
from legal_rag.vector_store import build_and_save_vector_db

def load_jsonl_dataset(filepath):
    print(f"Loading dataset from {filepath}")
    docs = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip():
                continue
            item = json.loads(line)
            
            # Combine relevant fields for embedding
            text = item.get("text", "")
            if not text:
                continue
                
            metadata = {
                "chunk_id": item.get("chunk_id", ""),
                "law_name": item.get("law_name", ""),
                "article_number": item.get("article_number", ""),
                "citation": item.get("citation", ""),
                "keywords": item.get("keywords", []),
                "domain": item.get("domain", "")
            }
            
            # We add context to the text to improve embedding quality
            enriched_content = f"{metadata['citation']}\nKeywords: {', '.join(metadata['keywords'])}\n\n{text}"
            
            docs.append(Document(page_content=enriched_content, metadata=metadata))
            
    print(f"Loaded {len(docs)} documents.")
    return docs

def run_ingestion():
    if not os.path.exists(DATASET_PATH):
        print(f"ERROR: Dataset not found at {DATASET_PATH}")
        sys.exit(1)
        
    documents = load_jsonl_dataset(DATASET_PATH)
    build_and_save_vector_db(documents)
    print("Ingestion complete.")

if __name__ == "__main__":
    run_ingestion()
