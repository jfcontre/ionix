FROM node:19

WORKDIR /usr/src/app

# Install production dependencies.
COPY package*.json ./
RUN npm install 

# Install netcat and dos2unix.
RUN apt-get update && apt-get install -y netcat dos2unix

# Copy local code to the container image.
COPY . ./

# Convert end-of-line characters from CRLF to LF.
RUN dos2unix docker-entrypoint.sh

# Ensure the entrypoint script is executable.
RUN chmod +x docker-entrypoint.sh

# Generate Prisma client.
RUN npx prisma generate

# Run the web service on container startup.
CMD ["sh", "/usr/src/app/docker-entrypoint.sh"]
