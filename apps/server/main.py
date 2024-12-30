import uvicorn

from server.config.env import (
    get_host,
    get_port,
    get_reload,
    get_workers,
    load_environment,
)
from server.router.app import app
from server.utils.logger import get_log_level, logger, setup_logging


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

    logger.info(f"Starting server on {get_host()}:{get_port()}, reload={get_reload()}, workers={get_workers()}")

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())