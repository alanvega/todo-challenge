#!/usr/local/bin/bash
docker stop my-mongodb-container
docker rm my-mongodb-container
docker rmi my-mongodb
