from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socketio

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

# ---------------- Socket.IO setup ---------------- #

# Async Socket.IO server allowing CORS from frontend
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=["http://localhost:3000"], logger=False, engineio_logger=False)

# Wrap FastAPI with Socket.IO ASGI app so we can serve both HTTP & WebSocket from one port
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

# Helper to broadcast a transaction event
async def broadcast_transaction(tx: dict):
    """Emit a `new_transaction` event with the given transaction payload to all clients."""
    await sio.emit("new_transaction", tx)


# Basic connection handlers (optional, for logging)
@sio.event
async def connect(sid, environ):
    print("Socket connected:", sid)


@sio.event
async def disconnect(sid):
    print("Socket disconnected:", sid)

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


@app.get("/transactions")
async def list_transactions():
    """Return a mock list of recent transactions.
    Replace with database-backed implementation later."""
    return sample_transactions

# Example endpoint to create a new transaction and broadcast it (for testing)
@app.post("/transactions")
async def create_transaction(tx: dict):
    """Add the incoming transaction to in-memory list and broadcast via WebSocket."""
    sample_transactions.insert(0, tx)
    # Broadcast to connected Socket.IO clients
    await broadcast_transaction(tx)
    return {"status": "ok"}

if __name__ == "__main__":
    # Run the combined ASGI app so Socket.IO works alongside FastAPI routes
    uvicorn.run(socket_app, host="0.0.0.0", port=8000, reload=True)
