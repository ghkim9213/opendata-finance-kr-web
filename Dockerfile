# FROM node:lts-alpine as builder
FROM node as builder
# versioned node works in local test
# it triggers stucking on npm run build in ec2

ENV NODE_ENV production

ADD . .
RUN \
  npm install --production && \
  npm run build

FROM nginx:latest
COPY --from=builder ./build /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
