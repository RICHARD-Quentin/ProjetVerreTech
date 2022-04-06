FROM node:14-alpine

WORKDIR /src/app/logistic

COPY ./logistic/package.json .
RUN npm install

COPY ./logistic /src/app/logistic
COPY ./common /src/app/common
RUN npm run build

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]
