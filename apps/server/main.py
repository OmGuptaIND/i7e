import uvicorn

from server.router import app
from server.utils.env import (
    get_host,
    get_port,
    get_reload,
    get_workers,
    load_environment,
)
from server.utils.logger import get_log_level, setup_logging


async def main():
    """
    Main Server Loop
    """
    # Load environment variables
    load_environment()

    # Setup logging
    setup_logging()

    config = uvicorn.Config(
        app=app,
        host=get_host(),
        port=get_port(),
        workers=get_workers(),
        reload=get_reload(),
        log_level=get_log_level(),
    )

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())