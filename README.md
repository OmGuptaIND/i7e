# i7E

Welcome to the i7E repository! This is where I am building and integrating different AI providers and creating a playground for AI experimentation and development.

## Project Structure

The repository is organized into two main parts:

1. **Client**: This is the frontend of the application, built with Next.js.
2. **Server**: This is the backend of the application, built with FastAPI (Python).

### Directory Breakdown

- `/client`: Contains the Next.js frontend code.
- `/server`: Contains the FastAPI backend code.

## Deployment

The frontend is deployed and accessible at: [https://i7e-client.vercel.app/](https://i7e-client.vercel.app/)

## Development Tooling

I am continuously building and adding various development tools to enhance the functionality and usability of this project. Stay tuned for more updates!

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:OmGuptaIND/i7e.git
    ```
2. Navigate to the project directory:
    ```bash
    cd i7e
    ```
3. Follow the setup instructions for both the client and server directories.

### Client Setup

Navigate to the `/client` directory and install the dependencies:
```bash
cd client
bun install
```

Start the development server:
```bash
bun run dev
```

### Server Setup

Navigate to the `/server` directory and create a virtual environment using Poetry. If you don't have Poetry installed, you can follow the instructions [here](https://python-poetry.org/docs/#installation).

```bash
cd server
poetry install
```

Make sure `make` is installed on your system. If `make` is installed, you can start the server with:
```bash
make run
```

If `make` is not installed, you can start the server with:
```bash
poetry run python main.py
```

Thank you for checking out i7E! Happy coding!