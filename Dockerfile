FROM node:12-alpine
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install && npm install pm2 -g
COPY . .
CMD ["pm2-runtime", "worker.js"]

