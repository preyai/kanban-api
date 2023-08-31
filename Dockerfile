FROM node:19-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3030
RUN yarn compile
CMD yarn start