# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-alpine

WORKDIR /app

RUN npm install -g http-server

# 👇 IMPORTANT: replace with your real project name
COPY --from=build /app/dist/naralaw-web ./dist

EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080", "--proxy", "http://localhost:8080?"]
