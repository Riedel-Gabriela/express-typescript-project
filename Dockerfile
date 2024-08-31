FROM node:18.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g nodemon

EXPOSE 80
CMD [ "nodemon" ]