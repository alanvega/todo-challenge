#This is only for development purposes
FROM mongo:latest

# Create a directory for MongoDB data
RUN mkdir -p /data/db \
    && chown -R mongodb:mongodb /data/db

COPY ./init-mongo.js /docker-entrypoint-initdb.d/

EXPOSE 27017

# Start the MongoDB server
CMD ["mongod", "--dbpath", "/data/db"]
