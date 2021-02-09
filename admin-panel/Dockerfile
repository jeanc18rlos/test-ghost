FROM node:12.0.3

RUN mkdir -p /app

COPY package*.json /app/
COPY yarn.lock /app/

WORKDIR /app

RUN npm install -g yarn

RUN yarn install

COPY . /app

EXPOSE 3000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn run start