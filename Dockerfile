FROM mhart/alpine-node:latest

RUN mkdir -p /usr/my-first-node-app
COPY . /usr/my-first-node-app/
WORKDIR /usr/my-first-node-app
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]