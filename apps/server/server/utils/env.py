import os
from pathlib import Path

from dotenv import load_dotenv


def load_environment():
    """
    Load environment variables from .env files.
    
    Loads in the following order (higher priority overrides lower):
    1. .env.local (highest priority, for local dev overrides)
    2. .env.development/staging/production (based on ENV)
    3. .env (base defaults, lowest priority)
    """
    env_path = Path(".")
    
    # Load base defaults first
    load_dotenv(env_path / ".env")
    
    # Load environment specific vars
    env = os.getenv("ENV", "development")
    if env != "production":
        load_dotenv(env_path / f".env.{env}", override=True)
    
    # Load local overrides last (highest priority)
    load_dotenv(env_path / ".env", override=True)


def get_host() -> str:
    """
    Get the host to bind to.
    
    Returns:
        str: Host to bind to.
    """
    return os.getenv("HOST", "localhost")

def get_port() -> int:
    """
    Get the port to bind to.
    
    Returns:
        int: Port to bind to.
    """
    return int(os.getenv("PORT", 8000))

def get_reload() -> bool:
    """
    Get the reload flag.
    
    Returns:
        bool: Reload flag.
    """
    return os.getenv("RELOAD", "true").lower() == "true"

def get_log_level() -> str:
    """
    Get the log level.
    
    Returns:
        str: Log level.
    """
    return os.getenv("LOG_LEVEL", "info")

def get_workers() -> int:
    """
    Get the number of workers.
    
    Returns:
        int: Number of workers.
    """
    return int(os.getenv("WORKERS", 1))