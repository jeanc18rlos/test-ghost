FROM node:10.14.2-alpine

RUN mkdir -p /api

COPY package*.json /api/

WORKDIR /api

RUN npm install

RUN npm install -g nodemon



COPY . /api

EXPOSE 8080

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run start