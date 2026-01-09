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

ENV NODE_ENV=production
ENV PORT=8080

# Copy full build output (browser + server)
COPY --from=build /app/dist/nara-law ./dist

EXPOSE 8080

CMD ["node", "dist/server/server.mjs"]
