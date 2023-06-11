FROM node:15-buster-slim

RUN apt-get update && apt-get install -y \
    git