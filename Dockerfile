FROM node:22.4.0-alpine

WORKDIR /app/

RUN apk update && \
    apk add git

COPY ./package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "start:dev"]