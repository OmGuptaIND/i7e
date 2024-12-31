from pydantic import BaseModel

from server.flows.chat.schema import VALID_PROVIDERS, Role


class CreateChatRequest(BaseModel):
    """
    Request Schema to create a New Chat Session
    """
    provider: VALID_PROVIDERS

class CreateChatResponse(BaseModel):
    """
    Response Schema when a New Chat Session is created
    """
    session_id: str

class AskRequest(BaseModel):
    """
    Request Schema when User asks a question
    """
    session_id: str
    role: Role
    content: str