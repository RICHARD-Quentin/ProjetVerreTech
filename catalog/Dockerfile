FROM node

# Create index directory
WORKDIR /usr/src/index

# Install index dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle index source
COPY . .

EXPOSE 3002

CMD [ "node", "server.js" ]
