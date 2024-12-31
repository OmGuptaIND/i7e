from collections.abc import AsyncGenerator
from typing import Protocol, runtime_checkable

from .schema import ChatMessage, ChatResponse


@runtime_checkable
class ChatProvider(Protocol):
    """Protocol defining what a chat provider must implement"""
    async def ask_async(self, message: ChatMessage) -> AsyncGenerator[ChatResponse, None]:
        """Send a message and get responses"""
        ...

    def reset(self) -> None:
        """Reset the chat session"""
        ...