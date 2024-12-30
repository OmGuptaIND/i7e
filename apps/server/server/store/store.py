
from server.protocol.chatbot.provider import ChatProvider
from server.utils.emitter import Emitter
from server.utils.logger import logger


class Store(Emitter):
    """
    Store to keep track of Different LLM Conversations Happening
    """
    def __init__(self):
        super().__init__()

        self._chat_store: dict[str, ChatProvider] = {}

        self._logger = logger.getChild("Store")

    def add_chatbot(self, session_id: str, chatbot: ChatProvider):
        """
        Add a ChatBot to the Store
        """
        assert isinstance(chatbot, ChatProvider)

        self._logger.info(f"Adding ChatBot to Store: {session_id}")

        self._chat_store[session_id] = chatbot

    def get_chatbot(self, session_id: str):
        """
        Get a ChatBot from the Store
        """
        return self._chat_store.get(session_id)
    
    def remove_chatbot(self, session_id: str):
        """
        Remove a ChatBot from the Store
        """
        self._logger.info(f"Removing ChatBot from Store: {session_id}")

        return self._chat_store.pop(session_id, None)
    
    def total_conversations(self):
        """
        Get the total number of conversations happening
        """
        return len(self._chat_store)
    
store = Store()