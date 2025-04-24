FROM node:22-slim

#RUN apk add --update bash vim && rm -rf /var/cache/apk/*

# create destination directory
WORKDIR /pibsas

# Install app dependencies
COPY package*.json ./
RUN npm install

# Run the application as a non-root user
USER node

# Bundle app source
COPY . .

# Exponha a porta da aplicação (se necessário)
EXPOSE 5173

#CMD node src/app.js
CMD npm run dev