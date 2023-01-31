FROM node:lts-alpine as builder

ENV NODE_ENV production

WORKDIR /app

COPY ./package.json ./
RUN npm install --production
COPY . ./

RUN npm run build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
