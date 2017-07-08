FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/service
WORKDIR /usr/src/service

# Here go all logs
RUN mkdir -p storage/logs/app
RUN chmod 777 storage/logs/app

# Install dependencies
RUN npm install -g pm2

# Start service
EXPOSE 3000
CMD [ "sh" ]
