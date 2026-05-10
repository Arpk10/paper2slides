import fitz  # PyMuPDF
import httpx
import re

async def fetch_arxiv_pdf(url: str) -> bytes:
    """
    Given an arXiv URL (abs or pdf), fetches the raw PDF bytes.
    """
    # Convert abs to pdf URL if needed
    if "/abs/" in url:
        url = url.replace("/abs/", "/pdf/")
    if not url.endswith(".pdf"):
        url += ".pdf"
        
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.content

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Fast extraction of text from PDF bytes.
    Extracts text from all pages and concatenates it.
    """
    doc = fitz.open("pdf", pdf_bytes)
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n\n"
    
    # Simple cleanup
    text = text.replace("\x00", " ")
    
    # We might want to truncate if the text is too long (e.g. over 100k chars)
    # but Claude Sonnet handles 200k tokens well. Let's limit to 100k chars for safety and cost
    if len(text) > 100000:
        text = text[:100000] + "\n\n...[TRUNCATED FOR LENGTH]..."
        
    return text
