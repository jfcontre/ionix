# Web TODO App

This project is a web-based TODO list application developed using Vite, React, and TypeScript.

## Features

- **Vite**: An extremely fast front-end build tool.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Prerequisites

Before running this project, you will need:

- [Node.js](https://nodejs.org/) (Preferably the LTS version)
- [npm](https://www.npmjs.com/) (Comes installed with Node.js)

## Installation

Follow these steps to set up the project:

1. Navigate to the project directory:
   ```bash
   cd path/to/web-todo-app
   ```
2. Install dependencies
   ```bash
   npm install
   ```
## Running the Application
To run the application in development mode, use the following command:
   ```bash
   npm run dev
   ```
This will start the development server, and you can view the application at ```http://localhost:3001```

## Using  the Application

To use the application, you must log in with a user account. If you don't have an account, you can use the following test credentials for an admin role:

- **Username**: admin
- **Password**: Passw0rd$
  
These credentials grant you administrator access and are meant for demonstration purposes only. Please be aware that they should not be used for actual data entry or real-world usage. This is to ensure security and data integrity in a production environment.

## User Authentication
This app requires user authentication to access the TODO list features. The authentication is handled through a backend service. Ensure that the backend server is running and accessible for the authentication to work correctly.