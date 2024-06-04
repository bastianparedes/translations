FROM node:20.11.1

WORKDIR /app

COPY package*.json ./
RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
