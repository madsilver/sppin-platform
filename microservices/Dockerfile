FROM ubuntu:16.04

LABEL maintainer "Silver"

EXPOSE 3000

ENV NODE_ENV development

RUN apt-get update -q \
    && apt-get install -y \
    curl \
    ssh \
    gcc \
    make \
    build-essential \
    libkrb5-dev \
    sudo \
    apt-utils

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get install -yq nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/app