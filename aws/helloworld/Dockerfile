 FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
    ENV NODE_VERSION 16.17.0
COPY . . 

EXPOSE 6000
CMD [ "node", "index.js" ]
