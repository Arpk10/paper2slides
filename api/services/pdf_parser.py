import fitz  # PyMuPDF

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
