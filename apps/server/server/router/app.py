from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.config import settings

from .chat.router import router as chat_router
from .health.router import router as health_router
from .user.router import router as user_router

app = FastAPI(title="i7E Server", version="1.0.0", )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix=settings.API_V1_STR)
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(chat_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to i7E"}