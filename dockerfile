FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm install

RUN npm run build

# Copy the rest of the application
COPY . .

# Copy .env.example as .env in the container
COPY .env.example .env

EXPOSE 3000

# Use environment variables from the container
CMD ["npm", "start"]