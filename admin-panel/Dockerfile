FROM node:12.18.3

RUN mkdir -p /app

COPY package*.json /app/


WORKDIR /app


RUN yarn install

COPY . /app

EXPOSE 3000


CMD yarn run dev