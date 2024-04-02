FROM node:16

WORKDIR /src/server

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 7000
CMD [ "node", "./dist/server.js"]


