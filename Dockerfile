FROM node:alpine

# Create app directory
RUN mkdir -p /opt/services/api_name
WORKDIR /opt/services/api_name

# Here go all logs
RUN mkdir -p storage/logs/app
RUN chmod 777 storage/logs/app

# Start service
EXPOSE 3000
CMD [ "sh" ]
