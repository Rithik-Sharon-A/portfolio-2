import os
import chromadb
from openai import OpenAI
from typing import List, Dict, Any

CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", "./chroma_db")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "openai/text-embedding-3-small")

# OpenRouter client for embeddings
embedding_client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

# ChromaDB client
chroma_client = chromadb.PersistentClient(path=CHROMA_DB_PATH)

def get_collection():
    return chroma_client.get_or_create_collection(
        name="portfolio_content",
        metadata={"hnsw:space": "cosine"}
    )

def get_embedding(text: str) -> List[float]:
    """Get embedding for a text using OpenRouter"""
    response = embedding_client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=text
    )
    return response.data[0].embedding

async def embed_and_store(chunks: List[Dict[str, Any]]) -> int:
    """Embed chunks and store in ChromaDB"""
    collection = get_collection()
    
    # Clear existing data
    try:
        existing = collection.get()
        if existing["ids"]:
            collection.delete(ids=existing["ids"])
    except Exception as e:
        print(f"Error clearing collection: {e}")

    ids = []
    documents = []
    embeddings = []
    metadatas = []

    for chunk in chunks:
        try:
            embedding = get_embedding(chunk["content"])
            ids.append(chunk["id"])
            documents.append(chunk["content"])
            embeddings.append(embedding)
            metadatas.append(chunk.get("metadata", {}))
        except Exception as e:
            print(f"Error embedding chunk {chunk['id']}: {e}")

    if ids:
        collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    return len(ids)
