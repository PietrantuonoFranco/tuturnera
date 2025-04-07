# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /server

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3000"]