# билдер
FROM node:alpine as builder

WORKDIR /front/src/

COPY ./src/package.json ./package.json
COPY ./src/package-lock.json ./package-lock.json
RUN npm install --production
RUN npm install -g @angular/cli@8.3.25

COPY ./src/ .
RUN npm run build

# целевой образ
FROM nginx

RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/conf.d /etc/nginx/conf.d
COPY --from=builder /front/src/dist/author-book /usr/share/nginx/html

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
