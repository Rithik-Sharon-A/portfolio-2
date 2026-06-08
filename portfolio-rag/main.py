from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.sync import router as sync_router

app = FastAPI(
    title="Portfolio RAG Service",
    description="AI chatbot backend for Rithik Sharon A portfolio",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:1337"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(sync_router, prefix="/sync", tags=["sync"])

@app.get("/")
async def root():
    return {
        "status": "running",
        "service": "Portfolio RAG",
        "owner": "Rithik Sharon A"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
