FROM node:latest

WORKDIR /app
COPY . .

USER root

RUN npm install -g @nestjs/cli
RUN npm install
RUN npm build

CMD [ "npm", "run", "start:prod" ]
