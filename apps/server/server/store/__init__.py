import uuid

from .store import store

__all__ = [
    "store",
]

# Cleanup docs of unexported modules
_module = dir()
NOT_IN_ALL = [m for m in _module if m not in __all__]

__pdoc__ = {}

for n in NOT_IN_ALL:
    __pdoc__[n] = False


def generate_random_session_id() -> str:
    """
    Generate a random session id
    """
    return str(uuid.uuid4())