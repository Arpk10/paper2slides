# Paper2Slides (MicroSaaS Asset)

> Turn arXiv papers into seminar-ready presentations instantly.

Paper2Slides is an ultra-lean, highly optimized microSaaS designed to solve a specific, painful problem for researchers and PhD students: formatting complex academic papers into concise, visually clean presentations.

## Why This Asset Has High Flip Value
- **Zero AI Bloat:** No vector databases, no slow OCR, no complex agents. It uses fast raw-text extraction and strict prompt engineering via Claude 3.5 Sonnet to guarantee an 8-slide structure.
- **Immediate ROI:** Users don't have to learn a new slide editor. They input an arXiv URL, and the product returns a standard `.pptx` file in under 20 seconds.
- **Premium Optics:** The landing page is built to convert. Dark mode, minimal UI, social proof, and subtle animations make it feel like a VC-backed product.

## Core Tech Stack
- **Frontend:** Next.js (App Router), TailwindCSS, shadcn/ui.
- **Backend:** FastAPI (Python), `httpx` (arXiv fetching), `PyMuPDF` (PDF parsing), `python-pptx` (export).
- **AI Processing:** Anthropic Claude 3.5 Sonnet (Optimized for academic tone and structured JSON output).
- **Auth:** Clerk (Fast, recognizable OAuth).

## Features
- 🔗 **ArXiv Integration:** Paste an arXiv URL and get slides. No upload needed.
- 🎨 **Domain Templates:** Prompts tuned for Physics Seminars, ML Conferences, Journal Clubs, and Thesis Defenses.
- ⏱️ **Fast Generation:** Generates the presentation in ~10-20 seconds.
- 💾 **Direct Export:** Immediate `.pptx` download. No web editors to maintain.

## Quick Start (Local Deployment)

### 1. Start the API (Backend)
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # Or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
export ANTHROPIC_API_KEY="your-key-here"
uvicorn main:app --reload --port 8000
```

### 2. Start the Web App (Frontend)
```bash
cd web
npm install
# Ensure Clerk variables are in .env.local
npm run dev
```

## Production Deployment (1-Click)
- **Frontend:** Import the repository into **Vercel**. Set root directory to `web`.
- **Backend:** Import the repository into **Render** as a Web Service. Render will auto-detect the `render.yaml` file and deploy the FastAPI server.

---

*Note to buyers: Check `screenshots/` and `demo_assets/` for promotional materials to use in your launch.*
