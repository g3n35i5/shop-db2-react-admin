FROM node:18-buster-slim

RUN apt-get update && apt-get install -y \
    git