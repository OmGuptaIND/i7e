from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any, Literal, Optional

SYSTEM_INSTRUCTIONS ="""
You are a Helpfull Assistant, which answers the users Query and provide useful information they need.
"""

@dataclass
class ProviderOptions:
    candidate_count: Optional[int] = None
    """
        Number of generated responses to return.
    """
    stop_sequences: Optional[list[str]] = None
    """
        The set of character sequences (up
        to 5) that will stop output generation. If
        specified, the API will stop at the first
        appearance of a stop sequence. The stop sequence
        will not be included as part of the response.
    """

    frequency_penalty: Optional[float] = None
    """
    Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
    """

    logprobs: Optional[int] = None
    """
    Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.
    """

    response_logprobs: Optional[bool] = None
    """
    Whether to include the log probabilities of the tokens in the response.
    """

    max_output_tokens: Optional[int] = None
    """
    An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.
    """

    presence_penalty: Optional[float] = None
    """
    Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    """

    stream: bool = True
    """
    If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
    """

    temperature: Optional[float] = 0.8
    """
    What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
    """

    top_p: Optional[float] = 1.0
    """
    An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
    """

    top_k: Optional[int] = None
    """
    The maximum number of tokens to consider when
    sampling.
    """

    response_mime_type: Optional[Literal["text/plain", "application/json", "text/x-enum"]] = None
    """
    Output response mimetype of the generated candidate text.
    """

    response_schema: Optional[Mapping[str, Any]] = None
    """
    Specifies the format of the JSON requested if response_mime_type is
    `application/json`.
    """