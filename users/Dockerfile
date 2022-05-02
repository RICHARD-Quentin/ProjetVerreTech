FROM node:14-alpine

WORKDIR /src/app/users

COPY ./users/package.json .
RUN npm install

COPY ./users /src/app/users
COPY ./common /src/app/common
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
