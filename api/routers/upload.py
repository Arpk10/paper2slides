from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
from services.pdf_parser import extract_text_from_pdf
from services.ai_generator import generate_slides_from_text
from services.pptx_builder import create_pptx

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    try:
        # 1. Read file bytes
        pdf_bytes = await file.read()
        
        # 2. Extract text
        text = extract_text_from_pdf(pdf_bytes)
        
        # 3. Generate Slides JSON with AI
        slide_data = generate_slides_from_text(text)
        
        # 4. Generate PPTX
        pptx_bytes = create_pptx(slide_data)
        
        # 5. Return PPTX file as response
        headers = {
            'Content-Disposition': f'attachment; filename="{file.filename.replace(".pdf", "")}-presentation.pptx"'
        }
        return Response(content=pptx_bytes, media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation", headers=headers)
        
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the presentation.")
