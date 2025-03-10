FROM node:14

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3333

CMD ["yarn", "dev:server"]