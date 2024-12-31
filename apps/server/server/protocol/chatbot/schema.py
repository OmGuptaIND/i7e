from typing import Literal, TypedDict

Models = Literal["gpt-4o", "gpt-4o-mini"]
VALID_PROVIDERS = Literal["openai", "gemini", "anthropic", "deepseek"]
Role = Literal["user", "developer", "assistant", "model"]
ChatMessageResponseType = Literal["content", "error", "done"]


class ChatResponse(TypedDict):
    """Standardized chat response format"""
    response_id: str
    type: ChatMessageResponseType
    content: str

class ChatMessage(TypedDict):
    session_id: str
    """
    Session Id of the Chat Conversation
    """
    
    role: Role
    """
    Role of the message author, one of "user", "developer", "assistant"
    """
    
    content: str
    """
    Content of the Message
    """