from collections.abc import AsyncGenerator
from typing import Optional

from openai import AsyncOpenAI, AsyncStream

from server.config.env import get_oai_api_key
from server.protocol.chatbot.schema import (
    ChatMessage,
    ChatResponse,
)
from server.utils import generate_random_session_id
from server.utils.logger import logger

from . import _api


class ChatBot:
    """
    ChatBot provider for OpenAI
    """
    def __init__(self, session_id: str, options: Optional[_api.ProviderOptions] = None):
        self.client = AsyncOpenAI(
            api_key=get_oai_api_key(),
            max_retries=2,
        )

        self.session_id = session_id

        self._messages: list[_api.ChatCompletionMessageParam] = []

        self._options = options or _api.ProviderOptions(model="gpt-4o-mini")

        self._logger = logger.getChild(f"ChatBot-{session_id}")
    
    def reset(self) -> None:
        """
        Reset the Chat Session
        """
        self._messages = []

    async def ask_async(self, message: ChatMessage) -> AsyncGenerator[ChatResponse, None]:
        response_id = generate_random_session_id()
        
        try:
            self._messages.append({
                "role":"user",
                "content": message["content"],
            })
            
            response = await self.client.chat.completions.create(
                user=self.session_id,
                messages=self._messages,

                # LLM Options
                model=self._options.model,
                store=self._options.store,
                metadata=self._options.metadata,
                frequency_penalty=self._options.frequency_penalty,
                logprobs=self._options.logprobs,
                top_logprobs=self._options.top_logprobs,
                max_completion_tokens=self._options.max_completion_tokens,
                n=self._options.n,
                modalities=self._options.modalities,
                presence_penalty=self._options.presence_penalty,
                stream=self._options.stream,
                stream_options=self._options.stream_options,
                temperature=self._options.temperature,
                top_p=self._options.top_p,
            )

            assert isinstance(response, AsyncStream)

            full_response = ""

            async for chunk in response:
                if chunk.choices:
                    delta = chunk.choices[0].delta

                    if delta.content:
                        full_response += delta.content
                        yield {
                            "response_id": response_id,
                            "content" : delta.content,
                            "type": "content"
                        }

            self._messages.append({
                "role": "assistant",
                "content": full_response,
            })

            self._logger.info(f"{full_response=}")

        except Exception as e:
            self._logger.error(f"ChatBot: Error in chat stream: {e}")

            yield {
                "response_id": response_id,
                "content" : str(e),
                "type": "error"
            }
