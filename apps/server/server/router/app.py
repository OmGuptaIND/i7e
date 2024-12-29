from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .user import router as user_router
from .health import router as health_router

app = FastAPI(title="i7E Server", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(health_router)

@app.get("/")
async def root():
    return {"message": "Welcome to i7E"}