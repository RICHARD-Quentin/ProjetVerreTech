FROM node:14-alpine

WORKDIR /src/app/cache

COPY ./catalog/package.json .
RUN npm install

COPY ./cache /src/app/cache
COPY ../common /src/app/common
RUN npm run build

EXPOSE 3004

ENTRYPOINT [ "npm", "start" ]
