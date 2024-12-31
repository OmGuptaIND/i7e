import json
from typing import TYPE_CHECKING

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse

from server.config.env import is_development
from server.flows.chat.gemini import GeminiProvider
from server.flows.chat.openai import OpenAIProvider
from server.store import store
from server.utils import generate_random_session_id
from server.utils.logger import logger

from .schema import AskRequest, CreateChatRequest, CreateChatResponse

if TYPE_CHECKING:
    from server.protocol.chat.schema import ChatMessage

router = APIRouter(
    prefix="/generate",
    tags=["chat"],
    responses={404: {"description": "Method Not found"}},
)

@router.post("/create/", 
    status_code=status.HTTP_201_CREATED, 
    response_model=CreateChatResponse
)
def on_create_chat(item: CreateChatRequest):
    try:
        session_id = "omg" if is_development else generate_random_session_id()

        if item.provider == "openai":
            store.add_chatbot(session_id, OpenAIProvider(session_id))

        elif item.provider == "gemini":
            store.add_chatbot(session_id, GeminiProvider(session_id))
            
        return {"session_id": session_id}
    
    except Exception as e:
        logger.error(f"Error in creating chat session: {e}")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Chat session already exists. Please create a new chat session."
        ) from e


@router.post("/chat/")
async def ask_chat(item: AskRequest):
    chat_bot = store.get_chatbot(item.session_id)

    if chat_bot is None:
        raise HTTPException(
            status_code=404,
            detail=f"Chat session '{item.session_id}' not found. Please create a new chat first."
        )
    
    async def chat_stream():
        try:
            message: ChatMessage = {
                "session_id": item.session_id,
                "content": item.content,
                "role": item.role,
            }

            async for chunk in chat_bot.ask_async(message):
                yield f"data: {json.dumps(chunk)}\n\n"

            yield "data: [DONE]\n\n"

        except Exception as e:
            logger.error(f"Error in chat stream: {e}")

            yield f"data: {e!s}\n\n"
            
            raise HTTPException(
                status_code=500,
                detail=f"An error occurred while processing the request: {e}"
            ) from e
    
    return StreamingResponse(
        chat_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Transfer-Encoding": "chunked",
        }
    )