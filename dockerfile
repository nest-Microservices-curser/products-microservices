
FROM node:23.11.0-alpine3.20
WORKDIR /usr/src/app
COPY package*.json ./
COPY package-lock.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .

EXPOSE 3001