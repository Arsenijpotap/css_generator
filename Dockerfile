FROM node
WORKDIR /app/
COPY package.json .
RUN npm install --include=optional --verbose
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]