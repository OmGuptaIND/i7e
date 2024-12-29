from typing import Optional

from openai import AsyncOpenAI, AsyncStream

from server.config.env import get_oai_api_key
from server.utils.logger import logger

from . import _api


class ChatBot:
    """
    ChatBot provider for OpenAI
    """
    def __init__(self, session_id: str, options: Optional[_api.ChatCompletion] = None):
        self.client = AsyncOpenAI(
            api_key=get_oai_api_key(),
            max_retries=2,
        )

        self._messages: list[_api.ChatCompletionMessageParam] = []

        self._chat_completion = options or _api.ChatCompletion(user=session_id)


    async def ask(self, message: _api.ChatCompletionMessageParam):
        """
        Ask the chatbot a question
        """
        try:
            self._messages.append(message)

            params = {
                k: v for k, v in self._chat_completion.__dict__.items() 
                if v is not None
            }

            params["messages"] = self._messages

            logger.info(f"ChatBot: Asking a question with params {params}")

            response = await self.client.chat.completions.create(
                model=self._chat_completion.model,
                messages=self._messages,
                store=self._chat_completion.store,
                metadata=self._chat_completion.metadata,
                frequency_penalty=self._chat_completion.frequency_penalty,
                logprobs=self._chat_completion.logprobs,
                top_logprobs=self._chat_completion.top_logprobs,
                max_completion_tokens=self._chat_completion.max_completion_tokens,
                n=self._chat_completion.n,
                modalities=self._chat_completion.modalities,
                presence_penalty=self._chat_completion.presence_penalty,
                stream=self._chat_completion.stream,
                stream_options=self._chat_completion.stream_options,
                temperature=self._chat_completion.temperature,
                top_p=self._chat_completion.top_p,
                user=self._chat_completion.user,
            )

            assert isinstance(response, AsyncStream)

            full_response = ""

            async for chunk in response:
                logger.info(f"ChatBot: Received chunk {chunk}")
                
                if chunk.choices:
                        delta = chunk.choices[0].delta
                        if delta.content:
                            full_response += delta.content
                            yield {
                                "type": "content",
                                "content": delta.content
                            }

            self._messages.append({
                "role": "assistant",
                "content": full_response,
            })

        except Exception as e:
            logger.error(f"ChatBot: Error in chat stream: {e}")

            yield {
                "type": "error",
                "content": str(e)
            }
