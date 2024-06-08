FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tailwind.config.js .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "start"]