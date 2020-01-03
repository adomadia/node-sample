FROM node:10-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN npm install && npm cache clean --force

COPY . /app

EXPOSE 4020

CMD ["npm", "run", "start"]
