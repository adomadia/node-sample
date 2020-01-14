FROM node:10-alpine

ARG ENV
ARG GRAYLOG_URL
ARG GRAYLOG_TOKEN

ENV ENV=$ENV
ENV GRAYLOG_URL=$GRAYLOG_URL
ENV GRAYLOG_TOKEN=$GRAYLOG_TOKEN

WORKDIR /app

COPY package.json /app/package.json

RUN npm install && npm cache clean --force

COPY . /app

EXPOSE 4020

CMD ["npm", "run", "start"]
