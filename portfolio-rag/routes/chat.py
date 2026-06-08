from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
import os
from rag.retriever import retrieve_relevant_chunks
from rag.prompt_builder import build_prompt

router = APIRouter()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
CHAT_MODEL = os.getenv("CHAT_MODEL", "google/gemini-flash-1.5")

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Rithik Sharon A Portfolio"
    }
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    reply: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Non-streaming chat endpoint"""
    # Retrieve relevant context
    chunks = retrieve_relevant_chunks(request.message, top_k=5)
    
    # Build prompt
    messages = build_prompt(request.message, chunks)
    
    # Call OpenRouter
    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=messages,
        max_tokens=300,
        temperature=0.7,
    )
    
    reply = response.choices[0].message.content
    return ChatResponse(reply=reply)

@router.post("/stream")
async def chat_stream(request: ChatRequest):
    """Streaming chat endpoint"""
    chunks = retrieve_relevant_chunks(request.message, top_k=5)
    messages = build_prompt(request.message, chunks)

    def generate():
        stream = client.chat.completions.create(
            model=CHAT_MODEL,
            messages=messages,
            max_tokens=300,
            temperature=0.7,
            stream=True,
        )
        for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta

    return StreamingResponse(generate(), media_type="text/plain")
