import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from dotenv import load_dotenv

# Append parent dir to path to ensure correct relative imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load env variables (GEMINI_API_KEY)
load_dotenv()

from legal_rag.pipeline import run_legal_rag_pipeline

app = FastAPI(title="HA9I Legal RAG API Service")

# Enable CORS allowing all origins (*) so mobile devices can access it directly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: Optional[str] = None
    message: Optional[str] = None
    conversation_history: Optional[List] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[str]

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    # Support both 'query' and 'message' to be compatible with Django and frontend direct calls
    query_text = request.query or request.message
    if not query_text:
        raise HTTPException(
            status_code=400,
            detail="Either 'query' or 'message' field is required."
        )
        
    try:
        # Run RAG search and generation
        result = run_legal_rag_pipeline(
            text=query_text,
            conversation_history=request.conversation_history
        )
        return ChatResponse(
            response=result["answer"],
            sources=result["sources"]
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal RAG pipeline error: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "gemini-2.5-flash"}

if __name__ == "__main__":
    port = int(os.environ.get("RAG_PORT", 8001))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
