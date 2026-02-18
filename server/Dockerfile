#  Use the Node 20 Alpine image
FROM node:20-alpine

# --no-cache keeps the image small by not saving the installer files
RUN apk add --no-cache openssl

#  set the working directory
WORKDIR /app

#  copy package files and prisma schema first
COPY package*.json ./
COPY prisma ./prisma/

#  install dependencies
RUN npm install

#  generate prisma client
RUN npx prisma generate

#  copy the rest of your server code
COPY . .

#  expose apollo's port
EXPOSE 4000

#  start in development
CMD ["npm", "run", "dev"]