# Use an official Node.js runtime as a parent image
FROM node:20

RUN npm install -g npm@latest
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the container
COPY . .

RUN npm run build

# Expose the port that your app is running on
EXPOSE 3004


# Run the custom entrypoint script
CMD ["npm", "start"]
