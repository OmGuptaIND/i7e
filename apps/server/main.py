import uvicorn
from server.router import Server

async def main():
    """
    Main Server Loop
    """
    config = uvicorn.Config(
        app=Server,
        host="localhost",
        port=8000,
        reload=True
    )

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())