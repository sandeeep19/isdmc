FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Baked into the bundle at build time. "/api/" keeps the browser calling the
# same origin, so nginx routes it to Django.
ENV NEXT_PUBLIC_API_URL=/api/
ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
