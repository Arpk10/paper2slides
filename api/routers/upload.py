from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from typing import Optional
from services.pdf_parser import extract_text_from_pdf, fetch_arxiv_pdf
from services.ai_generator import generate_slides_from_text
from services.pptx_builder import create_pptx

router = APIRouter()

@router.post("/upload")
async def upload_pdf(
    file: Optional[UploadFile] = File(None),
    arxiv_url: Optional[str] = Form(None),
    template_mode: str = Form("Standard")
):
    if not file and not arxiv_url:
        raise HTTPException(status_code=400, detail="Must provide either a PDF file or an arXiv URL.")
        
    if file and not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    try:
        # 1. Get PDF bytes
        filename_prefix = "presentation"
        if file:
            pdf_bytes = await file.read()
            filename_prefix = file.filename.replace(".pdf", "")
        else:
            pdf_bytes = await fetch_arxiv_pdf(arxiv_url)
            arxiv_id = arxiv_url.split("/")[-1].replace(".pdf", "")
            filename_prefix = f"arxiv_{arxiv_id}"
            
        # 2. Extract text
        text = extract_text_from_pdf(pdf_bytes)
        
        # 3. Generate Slides JSON with AI
        slide_data = generate_slides_from_text(text, template_mode)
        
        # 4. Generate PPTX
        pptx_bytes = create_pptx(slide_data)
        
        # 5. Return PPTX file as response
        headers = {
            'Content-Disposition': f'attachment; filename="{filename_prefix}-slides.pptx"'
        }
        return Response(content=pptx_bytes, media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation", headers=headers)
        
    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the presentation.")
