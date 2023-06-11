FROM node:16-buster-slim

RUN apt-get update && apt-get install -y \
    git