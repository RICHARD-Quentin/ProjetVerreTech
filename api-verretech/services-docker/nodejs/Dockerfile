FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]
#RUN /app/start.sh
