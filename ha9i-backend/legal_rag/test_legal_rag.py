import os
import sys

# Ensure the parent directory is in the path to allow imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from legal_rag.pipeline import run_legal_rag_pipeline

def chat_loop():
    print("\n" + "="*60)
    print("⚖️  Algerian Legal RAG Chatbot initialized.")
    print("Type your legal question below.")
    print("Type 'exit', 'quit', or 'q' to stop the chatbot.")
    print("="*60 + "\n")
    
    while True:
        # 1. Get user input
        user_input = input(">> YOU: ")
        
        # 2. Check for exit commands
        if user_input.strip().lower() in ['exit', 'quit', 'q']:
            print("\nExiting chatbot. Goodbye!")
            break
            
        # 3. Skip empty inputs
        if not user_input.strip():
            continue
            
        print("\nThinking... (Retrieving documents and generating answer)")
        print("-" * 40)
        
        # 4. Run the pipeline
        try:
            result = run_legal_rag_pipeline(text=user_input)
            
            print("\n>> Gemini 2.5 Flash:")
            print(result.get("answer", "No answer generated."))
            
            print("\n>> SOURCES:")
            sources = result.get("sources", [])
            if sources:
                for source in sources:
                    print(f"  - {source}")
            else:
                print("  - No sources retrieved.")
                
        except Exception as e:
            print(f"\n>> ERROR: {e}")
            
        print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    print("Starting Legal RAG Terminal Chatbot...")
    print("NOTE: Make sure you have run 'python -m legal_rag.ingest' to build the FAISS DB first!")
    print("NOTE: Make sure your GEMINI_API_KEY environment variable is set.")
    chat_loop()