from dataclasses import dataclass
from typing import Literal, Optional, Union

from openai.types import ChatModel
from openai.types.chat import (
    ChatCompletionAssistantMessageParam,
    ChatCompletionDeveloperMessageParam,
    ChatCompletionModality,
    ChatCompletionReasoningEffort,
    ChatCompletionStreamOptionsParam,
    ChatCompletionSystemMessageParam,
    ChatCompletionUserMessageParam,
)

ChatCompletionMessageParam = Union[
    ChatCompletionDeveloperMessageParam,
    ChatCompletionSystemMessageParam,
    ChatCompletionUserMessageParam,
    ChatCompletionAssistantMessageParam,
]

Models = Literal["gpt-4o", "gpt-4o-mini", ChatModel]

@dataclass
class ProviderOptions:
    model: Models
    """
    ID of the model to use, default is "gpt-4o-mini"
    """

    store: bool = False
    """
    Whether or not to store the output of this chat completion request for use in our model distillation or evals products.
    """

    reasoning_effort: Optional[ChatCompletionReasoningEffort] = None
    """
    !Important: Only for o1 Models
    Constrains effort on reasoning for reasoning models. Currently supported values are low, medium, and high. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.
    """

    metadata: Optional[dict[str, str]] = None
    """
    Developer-defined tags and values used for filtering completions in the OpenAI Dashboard.
    """

    frequency_penalty: Optional[float] = None
    """
    Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    """

    logprobs: Optional[bool] = False
    """
    Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.
    """

    top_logprobs: Optional[int] = None
    """
    An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.
    """

    max_completion_tokens: Optional[int] = None
    """
    An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.
    """

    n: Optional[int] = 1
    """
    How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.
    """

    modalities: Optional[list[ChatCompletionModality]] = None
    """
    Output types that you would like the model to generate for this request. Most models are capable of generating text, which is the default:["text"]

    The `gpt-4o-audio-preview model` can also be used to generate audio. To request that this model generate both text and audio responses, you can use:`
    """

    presence_penalty: Optional[float] = None
    """
    Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    """

    stream: bool = True
    """
    If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
    """

    stream_options: Optional[ChatCompletionStreamOptionsParam] = None
    """
    Options for streaming response. Only set this when you set stream: true.
    """

    temperature: Optional[float] = 0.8
    """
    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
    """

    top_p: Optional[float] = 1.0
    """
    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
    """

