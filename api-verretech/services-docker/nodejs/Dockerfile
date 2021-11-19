FROM node:latest

RUN mkdir -p /index
WORKDIR /index

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]
#RUN /index/start.sh
