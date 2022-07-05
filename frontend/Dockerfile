FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.17.9-alpine
COPY nginx-boot.sh /sbin/nginx-boot
COPY --from=build /app/dist /usr/share/nginx/html
CMD [ "/sbin/nginx-boot" ]
