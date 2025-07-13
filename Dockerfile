# Use Node.js as the base image
FROM node:18-alpine

# Install OpenJDK (for freemarker.js)
RUN apk add --no-cache openjdk17-jre

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Set environment variables (optional)
ENV NODE_ENV=production
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Start the Node.js application
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

