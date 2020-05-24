LABEL maintainer="Internship Program"

FROM node as build

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app
RUN $(npm bin)/ng build --prod --output-path=dist

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html