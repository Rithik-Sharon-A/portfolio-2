import os
from typing import List
from rag.embedder import get_collection, get_embedding

def retrieve_relevant_chunks(query: str, top_k: int = 5) -> List[str]:
    """Retrieve top-k most relevant chunks for a query"""
    try:
        collection = get_collection()
        query_embedding = get_embedding(query)
        
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=min(top_k, collection.count()),
            include=["documents", "distances"]
        )
        
        documents = results.get("documents", [[]])[0]
        return documents
    except Exception as e:
        print(f"Error retrieving chunks: {e}")
        return []
