#!/bin/bash

# Function to check if the database is ready
is_db_ready() {
    # Use netcat to check the database connection
    # Adjust the command according to the netcat version and syntax
    nc -z ${DB_HOST} ${DB_PORT} >/dev/null 2>&1
    return $?
}

# Wait for the database to be ready
echo "Waiting for database to be ready..."
while ! is_db_ready; do
  sleep 1
done
echo "Database is ready."

# Run Prisma db push
echo "Running Prisma db push..."
npx prisma db push

# Run the seed script
echo "Running seed script..."
npm run seed

# Start the main application
npm start