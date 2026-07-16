FROM node:22

WORKDIR /app

COPY package*.json ./

RUN rm -f package-lock.json

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start"]