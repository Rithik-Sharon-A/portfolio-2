from fastapi import APIRouter, BackgroundTasks
from rag.chunker import fetch_strapi_content
from rag.embedder import embed_and_store

router = APIRouter()

async def run_sync():
    """Background task to sync Strapi content to ChromaDB"""
    print("Starting RAG sync...")
    chunks = await fetch_strapi_content()
    count = await embed_and_store(chunks)
    print(f"RAG sync complete — {count} chunks embedded")

@router.post("/")
async def sync(background_tasks: BackgroundTasks):
    """Trigger sync — called by Strapi webhook on content change"""
    background_tasks.add_task(run_sync)
    return {"status": "sync started", "message": "Embedding in background"}

@router.post("/now")
async def sync_now():
    """Sync immediately and return result — for manual testing"""
    chunks = await fetch_strapi_content()
    count = await embed_and_store(chunks)
    return {
        "status": "success",
        "chunks_embedded": count,
        "message": f"Synced {count} content chunks from Strapi"
    }

@router.get("/status")
async def sync_status():
    """Check how many chunks are in ChromaDB"""
    from rag.embedder import get_collection
    try:
        collection = get_collection()
        count = collection.count()
        return {"status": "ok", "total_chunks": count}
    except Exception as e:
        return {"status": "error", "message": str(e)}
