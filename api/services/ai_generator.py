import os
import json
from anthropic import Anthropic
from pydantic import BaseModel, Field

# Ensure you set ANTHROPIC_API_KEY in your environment variables
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))

class Slide(BaseModel):
    title: str = Field(description="Title of the slide")
    bullets: list[str] = Field(description="3-5 concise bullet points for the slide")
    speaker_notes: str = Field(description="Speaker notes explaining the slide content")

class PresentationModel(BaseModel):
    slides: list[Slide] = Field(description="Exactly 8 slides as specified")

def generate_slides_from_text(paper_text: str) -> dict:
    """
    Sends the extracted PDF text to Claude Sonnet to generate 8 specific slides.
    Returns a dictionary matching the PresentationModel schema.
    """
    if not client.api_key:
        # Fallback dummy data for testing if no API key is provided
        return {
            "slides": [
                {"title": "Title", "bullets": ["A demo paper", "Author Name"], "speaker_notes": "Welcome."},
                {"title": "Problem", "bullets": ["The problem is hard"], "speaker_notes": "It's hard."},
                {"title": "Background", "bullets": ["Prior work failed"], "speaker_notes": "They failed."},
                {"title": "Method", "bullets": ["We used AI"], "speaker_notes": "AI is good."},
                {"title": "Results", "bullets": ["We got 99% accuracy"], "speaker_notes": "Very accurate."},
                {"title": "Key Equation", "bullets": ["E = mc^2"], "speaker_notes": "Energy mass equivalence."},
                {"title": "Conclusion", "bullets": ["We solved it"], "speaker_notes": "Thank you."},
                {"title": "Questions", "bullets": ["Any questions?"], "speaker_notes": "Q&A time."},
            ]
        }

    system_prompt = """
    You are an expert academic presentation designer. Your task is to take the provided text from a research paper 
    and convert it into a highly concise, 8-slide presentation.
    
    You MUST output EXACTLY 8 slides in this order:
    1. Title
    2. Problem
    3. Background
    4. Method
    5. Results
    6. Key Equation
    7. Conclusion
    8. Questions
    
    For each slide, provide:
    - title: the title of the slide.
    - bullets: 3 to 5 very concise, punchy bullet points. No long paragraphs.
    - speaker_notes: A brief paragraph of what the presenter should actually say.
    
    Return the response as a JSON object containing a "slides" array. No markdown wrapping, just valid JSON.
    """

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4000,
        temperature=0.2,
        system=system_prompt,
        messages=[
            {"role": "user", "content": f"Here is the research paper text:\n\n{paper_text}"}
        ]
    )

    result_text = response.content[0].text
    
    # Strip markdown code blocks if Claude adds them
    if result_text.startswith("```json"):
        result_text = result_text.split("```json")[1]
    if result_text.endswith("```"):
        result_text = result_text.rsplit("```", 1)[0]
    
    try:
        data = json.loads(result_text.strip())
        return data
    except json.JSONDecodeError:
        print("Failed to decode JSON from AI response")
        return {"slides": []}
