

# ---------- Stage 1: Build the TypeScript code ----------
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


# ---------- Stage 2: Run the compiled JS code ----------
FROM node:18-slim

WORKDIR /app

# Copy only build output and production deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

# Copy .env if needed (for local Docker only)
# COPY .env ./

EXPOSE 5000

CMD ["node", "dist/server.js"]
