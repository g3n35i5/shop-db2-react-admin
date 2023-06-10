FROM node:14-buster-slim

RUN apt-get update && apt-get install -y \
    git