FROM node:18.4.0-alpine3.16

WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn

ENTRYPOINT ["./node_modules/.bin/postgraphile", "-n", "0.0.0.0", "--append-plugins", "postgraphile-plugin-connection-filter"]
