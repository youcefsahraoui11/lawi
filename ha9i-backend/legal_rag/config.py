import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Paths
DATASET_PATH = os.path.join(
    BASE_DIR, "rag", "data", "scraping", "legal_scraper", "outputs", "rag_chunks.jsonl"
)
VECTOR_DB_PATH = os.path.join(BASE_DIR, "legal_rag", "db", "vector_db")

# Google Gemini API Settings
GEMINI_LLM_MODEL = "gemini-2.5-flash"
GEMINI_EMBEDDING_MODEL = "text-embedding-004"

# NVIDIA OCR Config (if used)
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
NVIDIA_BASE_URL = os.environ.get("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
NVIDIA_OCR_MODEL = os.environ.get("NVIDIA_OCR_MODEL", "nvidia/nv-docqa-1")