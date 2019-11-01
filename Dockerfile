FROM node:latest

WORKDIR usr

COPY . /usr

RUN npm install

EXPOSE 8080

CMD node server

