# => Build container
FROM node:14.16.0-buster as builder
WORKDIR /site
COPY package.json .
COPY yarn.lock .
RUN yarn

WORKDIR /site
COPY . .

RUN yarn build

# => Run container
FROM nginx:1.17-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /site/dist /usr/share/nginx/html/

# Default port exposure
EXPOSE 80
