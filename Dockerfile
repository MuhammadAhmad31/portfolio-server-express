# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port to be used
EXPOSE 4000

# Apply Prisma migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
