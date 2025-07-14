from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="CryptoGuard AI API",
    description="Advanced Cryptocurrency Security Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "CryptoGuard AI API is running!",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "CryptoGuard AI Backend",
        "timestamp": "2025-07-11T01:20:00Z"
    }

# Temporary sample data until database integration
sample_transactions = [
    {
        "id": "1",
        "hash": "0x1234567890abcdef",
        "amount": 0.5,
        "currency": "ETH",
        "riskLevel": "LOW",
        "timestamp": "2025-07-14T20:00:00Z",
        "from": "0xabc123",
        "to": "0xdef456",
        "status": "confirmed",
    },
    {
        "id": "2",
        "hash": "0xfedcba0987654321",
        "amount": 1.2,
        "currency": "BTC",
        "riskLevel": "HIGH",
        "timestamp": "2025-07-14T20:05:00Z",
        "from": "0x789xyz",
        "to": "0x456abc",
        "status": "pending",
    },
]


@app.get("/transactions")
async def list_transactions():
    """Return a mock list of recent transactions.
    Replace with database-backed implementation later."""
    return sample_transactions

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
