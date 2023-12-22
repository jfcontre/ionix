# TODO API Backend

## Getting Started

This is the backend portion of the TODO application which handles the API for CRUD operations on tasks, along with authorization to secure the endpoints.

### Requirements

- Docker
- Docker Compose

### Setup and Installation

To get the backend up and running, you'll need to have Docker and Docker Compose installed on your system. If you don't have them installed, please refer to the [Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.

Once Docker is set up, you can start the backend with the following command:

```sh
docker-compose up
```

### Setup and Installation without Docker

If you're not using Docker, you can still run the application directly on your machine. First, ensure you have Node.js and the package manager (npm or yarn) installed.

1. Install the dependencies:

```sh
npm install
```
2. Set up your .env file with the necessary environment variables.

3. Execute the seeder
```sh
npm run seed
```
4. Start the application
```sh
npm run start:dev
```
  

## API Documentation
After running the server, you can access the API documentation at:

```sh
http://localhost:PORT/swagger
```
Replace ```PORT``` with the actual port number your server is running on.


## Environment Variables

The application requires a set of environment variables to run correctly. For ease of setup and testing purposes, all sensitive values in the provided sample `.env` file have been left in plain text. 

**Important:**
For any production deployment or sensitive environments, ensure to replace these plain text values with secure secrets. It is highly recommended to use a secure method of storing and accessing environment variables such as a secrets manager or encrypted storage.

The `.env` file includes variables such as:

- Database connection strings
- Authentication keys
- API secrets

Be sure to set up your `.env` file with the appropriate secure
