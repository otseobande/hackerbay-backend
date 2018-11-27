FROM node:10.10.0

WORKDIR /usr/src/app

COPY package*.json ./

ENV JWT_TOKEN=secret

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]
