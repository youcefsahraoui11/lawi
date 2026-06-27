from langchain_community.retrievers import BM25Retriever
from legal_rag.vector_store import load_vector_db

class LegalRetriever:
    def __init__(self):
        print("Initializing Legal Retriever...")
        self.vector_db = load_vector_db()
        self.all_documents = list(self.vector_db.docstore._dict.values())
        
        self.vector_retriever = self.vector_db.as_retriever(
            search_kwargs={"k": 5}
        )
        
        self.bm25_retriever = None
        try:
            if self.all_documents:
                self.bm25_retriever = BM25Retriever.from_documents(self.all_documents)
                self.bm25_retriever.k = 5
                print("BM25 loaded successfully for legal documents.")
        except Exception as e:
            print(f"BM25 failed: {e}")

    def search(self, query: str, top_k=5):
        combined = {}
        
        # Vector search
        try:
            vector_docs = self.vector_retriever.invoke(query)
            for rank, doc in enumerate(vector_docs):
                # Use chunk_id as the unique key if available, otherwise snippet
                key = doc.metadata.get("chunk_id", doc.page_content[:100])
                score = 1.0 / (rank + 1)
                combined[key] = {"doc": doc, "score": score}
        except Exception as e:
            print(f"Vector search failed (falling back to BM25): {e}")
            
        # BM25 search
        if self.bm25_retriever:
            bm25_docs = self.bm25_retriever.invoke(query)
            for rank, doc in enumerate(bm25_docs):
                key = doc.metadata.get("chunk_id", doc.page_content[:100])
                score = 0.5 / (rank + 1)
                
                if key in combined:
                    combined[key]["score"] += score
                else:
                    combined[key] = {"doc": doc, "score": score}
                    
        # Final sort
        sorted_docs = sorted(
            combined.values(),
            key=lambda x: x["score"],
            reverse=True
        )
        
        final = [item["doc"] for item in sorted_docs[:top_k]]
        return final
