FROM node:12.16
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY ClientApp/package.json ./ClientApp/package.json
WORKDIR /usr/src/app/ClientApp
RUN npm install

WORKDIR /usr/src/app

COPY . .

RUN npm run build
EXPOSE 8081
CMD ["npm", "start"]