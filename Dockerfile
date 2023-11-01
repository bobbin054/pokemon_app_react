FROM node:18.4.0-alpine

WORKDIR /app

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

