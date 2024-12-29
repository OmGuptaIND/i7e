from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from server.providers.openai.chatbot import ChatBot, ChatCompletionUserMessageParam
from server.utils.logger import logger

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={404: {"description": "Method Not found"}},
)

chat_store: dict[str, ChatBot] = {}

class CreateItem(BaseModel):
    name: str

@router.post("/create/", status_code=status.HTTP_201_CREATED)
def on_create_chat(item: CreateItem):
    chat_bot = chat_store.get(item.name)

    if chat_bot is None:
        chat_store[item.name] = ChatBot(session_id=item.name)
        
        return {"session_id": item.name}
    
    raise HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail=f"Chat session '{item.name}' already exists. Please create a new chat session."
    )

class AskMessage(BaseModel):
    session_id: str
    role: str
    content: str

@router.post("/ask")
async def on_ask_chat(item: AskMessage):
    chat_bot = chat_store.get(item.session_id)

    if chat_bot is None:
        raise HTTPException(
            status_code=404,
            detail=f"Chat session '{item.session_id}' not found. Please create a new chat first."
        )
    
    async def chat_stream():
        try:

            message: ChatCompletionUserMessageParam = {
                "name": item.session_id,
                "content": item.content,
                "role": "user",
            }

            async for chunk in chat_bot.ask(message):
                yield f"data: {chunk}\n\n"

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