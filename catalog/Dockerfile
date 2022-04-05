FROM node:14-alpine

WORKDIR /src/app/catalog

COPY ./catalog/package.json .
RUN npm install

COPY ./catalog /src/app/catalog
COPY ../common /src/app/common
RUN npm run build

EXPOSE 3002

ENTRYPOINT [ "npm", "start" ]
