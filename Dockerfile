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

# Install lightweight static server
RUN npm install -g http-server

# Copy Angular build output
# 👇 Replace <project-name>
COPY --from=build /app/dist/nara-law ./dist

# Cloud Run port
EXPOSE 8080

# Serve Angular app
CMD ["http-server", "dist", "-p", "8080", "--proxy", "http://localhost:8080?"]
