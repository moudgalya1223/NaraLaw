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

# 👇 Adjust ONLY if your Angular outputPath is different
COPY --from=build /app/dist/nara-law/browser ./dist

# Cloud Run uses PORT env var (default 8080)
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "http-server dist -p $PORT --cors"]
