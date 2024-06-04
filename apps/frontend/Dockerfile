FROM node:20.11.1

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json /app/package.json
RUN npm install

EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll=1000", "--disable-host-check"]
