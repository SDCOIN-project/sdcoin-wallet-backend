FROM node:10.15
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN NODE_ENV=development npm install
COPY . .
CMD ["npm", "run", "start:prod"]
