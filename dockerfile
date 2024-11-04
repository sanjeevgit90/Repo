# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular application
RUN npm run build

# Expose the port that the Angular app will run on
EXPOSE 4200
# EXPOSE 443

# Define the command to start the Angular application
CMD ["npm", "start"]
