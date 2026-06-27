import os
import base64
import json
import re


# Try importing NVIDIA settings from config, or use placeholders
try:
    from legal_rag.config import NVIDIA_API_KEY, NVIDIA_BASE_URL, NVIDIA_OCR_MODEL
except ImportError:
    NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
    NVIDIA_BASE_URL = os.environ.get("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
    NVIDIA_OCR_MODEL = os.environ.get("NVIDIA_OCR_MODEL", "nvidia/nv-docqa-1")

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes audio (French, Arabic, Darija) to text using local Whisper model.
    """
    if not audio_path or not os.path.exists(audio_path):
        return ""
        
    try:
        import whisper
        print(f"Transcribing audio: {audio_path}")
        # Load a base or small model to be fast locally, it supports multilingual
        model = whisper.load_model("base")
        result = model.transcribe(audio_path)
        return result["text"].strip()
    except Exception as e:
        print(f"Error transcribing audio: {e}")
        return f"[Audio Transcription Failed: {e}]"

def _extract_parse_text(message) -> str:
    if getattr(message, "content", None):
        return message.content

    parts = []
    for tool_call in getattr(message, "tool_calls", []) or []:
        function = getattr(tool_call, "function", None)
        arguments = getattr(function, "arguments", None)
        if not arguments:
            continue
        try:
            parsed = json.loads(arguments)
        except json.JSONDecodeError:
            parts.append(arguments)
            continue
        for page in parsed:
            if isinstance(page, list):
                for block in page:
                    if isinstance(block, dict) and block.get("text"):
                        parts.append(block["text"].replace("<br>", "\n"))
            elif isinstance(page, dict) and page.get("text"):
                parts.append(page["text"].replace("<br>", "\n"))
    return "\n".join(parts)

def _clean_table_markup(text: str) -> str:
    if not text:
        return text

    cleaned = text
    cleaned = re.sub(r"\\begin\{tabular\}\{[^}]*\}", "\n", cleaned)
    cleaned = re.sub(r"\\end\{tabular\}", "\n", cleaned)
    cleaned = re.sub(r"\\multicolumn\{\d+\}\{[^}]*\}\{([^}]*)\}", r"\1", cleaned)
    cleaned = re.sub(r"\\multirow\{\d+\}\{[^}]*\}\{([^}]*)\}", r"\1", cleaned)
    cleaned = cleaned.replace("\\\\", "\n")
    cleaned = cleaned.replace("&", " ")
    cleaned = re.sub(r"\*\*([^*]*)\*\*", r"\1", cleaned)
    cleaned = re.sub(r"(?<!\w)\*([^*]+)\*(?!\w)", r"\1", cleaned)
    cleaned = re.sub(r"^\s*\|?[-:\s|]+\|?\s*$", "", cleaned, flags=re.MULTILINE)
    cleaned = cleaned.replace("|", " ")
    cleaned = re.sub(r"\\hline", "", cleaned)
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r"\n\s*\n+", "\n", cleaned)
    cleaned = "\n".join(line.strip() for line in cleaned.split("\n") if line.strip())

    return cleaned

def extract_text_from_image(image_path: str) -> str:
    """
    Extracts text from an image using the NVIDIA document parse OCR.
    """
    if not image_path or not os.path.exists(image_path):
        return ""
        
    if not NVIDIA_API_KEY:
        print("NVIDIA_API_KEY not set. Skipping OCR.")
        return ""

    try:
        from openai import OpenAI
        client = OpenAI(
            base_url=NVIDIA_BASE_URL,
            api_key=NVIDIA_API_KEY
        )
        
        print(f"Extracting text from image using NVIDIA OCR: {image_path}")
        with open(image_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()

        response = client.chat.completions.create(
            model=NVIDIA_OCR_MODEL,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}}
                ]
            }],
            max_tokens=4096
        )

        raw_text = _extract_parse_text(response.choices[0].message)
        return _clean_table_markup(raw_text)
        
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return f"[Image OCR Failed: {e}]"
