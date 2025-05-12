FROM node:23.11.0-alpine3.20

WORKDIR /usr/src/app 

COPY package.json ./
COPY package-lock.json ./


RUN npm install

COPY . .

RUN npx prisma generate


EXPOSE 3001