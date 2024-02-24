# Use an official Node runtime as a parent image
FROM node:16

# MongoDB installation
# Add MongoDB to the package source list
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Update the package index
RUN apt-get update

# Install MongoDB
RUN apt-get install -y mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Create a script to start the MongoDB and Node server
RUN echo 'mongod --fork --logpath /var/log/mongod.log && node app.js' > run.sh

# Grant permissions for the run script
RUN chmod +x run.sh

# Run when the container launches
CMD ["./run.sh"]
