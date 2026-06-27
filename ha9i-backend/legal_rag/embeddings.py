import os
from google import genai
from langchain_core.embeddings import Embeddings

class Colors:
    GREEN = '\033[92m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class GeminiEmbeddings(Embeddings):
    """
    Custom LangChain Embeddings class that leverages the official google-genai SDK 
    and the 'text-embedding-004' model for secure, high-performance embeddings.
    """
    def __init__(self, model="text-embedding-004"):
        self.model = model
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key or api_key.lower() in ("dummy", "mock", "placeholder"):
            print("WARNING: GEMINI_API_KEY is not set or is a mock key. Using dummy fallback embeddings (RAG vector search will be disabled, BM25 keyword search will still function).")
            self.client = None
        else:
            self.client = genai.Client(api_key=api_key)

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        if not self.client:
            # text-embedding-004 has 768 dimensions
            return [[0.0] * 768 for _ in texts]
        embeddings = []
        for text in texts:
            response = self.client.models.embed_content(
                model=self.model,
                contents=text
            )
            embeddings.append(response.embeddings[0].values)
        return embeddings

    def embed_query(self, text: str) -> list[float]:
        if not self.client:
            return [0.0] * 768
        response = self.client.models.embed_content(
            model=self.model,
            contents=text
        )
        return response.embeddings[0].values

def get_embeddings():
    print(f"{Colors.GREEN}{Colors.BOLD}Loading Google GenAI embedding model (text-embedding-004)...{Colors.RESET}")
    return GeminiEmbeddings(model="text-embedding-004")

