from collections.abc import AsyncGenerator
from typing import TYPE_CHECKING, Optional

import google.generativeai as genai

from server.config.env import get_google_api_key
from server.protocol.chatbot.schema import ChatMessage, ChatResponse
from server.utils import generate_random_session_id
from server.utils.logger import logger

from . import _api

if TYPE_CHECKING:
    from google.generativeai.types import ContentType


class GeminiProvider:
    def __init__(self, session_id: str, options: Optional[_api.ProviderOptions] = None):
        genai.configure(api_key=get_google_api_key())

        self._session_id = session_id

        self._client = genai.GenerativeModel(system_instruction=_api.SYSTEM_INSTRUCTIONS)

        self._chat_session = self._client.start_chat()

        self._options = options or _api.ProviderOptions()

        self._logger = logger.getChild("GeminiProvider")

    def reset(self) -> None:
        """
        Reset the Chat Session.
        """
        self._chat_session = self._client.start_chat()

    async def ask_async(self, message: ChatMessage) -> AsyncGenerator[ChatResponse, None]:
        response_id = generate_random_session_id()

        try:
            content: ContentType = {
                "role": message["role"],
                "parts": [{
                    "text": message["content"]
                }]
            }

            generation_config =genai.GenerationConfig(
                candidate_count=self._options.candidate_count,
                stop_sequences=self._options.stop_sequences,
                frequency_penalty=self._options.frequency_penalty,
                logprobs=self._options.logprobs,
                response_logprobs=self._options.response_logprobs,
                max_output_tokens=self._options.max_output_tokens,
                presence_penalty=self._options.presence_penalty,
                temperature=self._options.temperature,
                top_p=self._options.top_p
            )

            response = self._chat_session.send_message(
                content=content,
                stream=True,
                generation_config=generation_config
            )

            for chunk in response:
                yield {
                    "response_id": response_id,
                    "content": chunk.text,
                    "type": "content"
                }

        except Exception as e:
            yield {
                "response_id": response_id,
                "content": f"Error: {e}",
                "type": "error"
            }
    