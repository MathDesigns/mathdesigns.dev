# -------------------------------------------------
# ---------- 1. Build stage -----------------------
# -------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# 1.1  Copy lock-files first for better layer caching
COPY package*.json ./
RUN npm ci                          

# 1.2  Copy the rest and compile
COPY . .
RUN npm run build

RUN npm prune --omit=dev

# -------------------------------------------------
# ---------- 2. Runtime stage ---------------------
# -------------------------------------------------
# gcr.io/distroless/nodejs:20 includes:
#   • tini as PID 1 (proper signal handling)
#   • CA certificates
#   • a non-root default user (UID 1337)
FROM gcr.io/distroless/nodejs20 AS runtime
WORKDIR /app

COPY --from=builder /app/build        ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV NODE_ENV=production


CMD ["build/index.js"]
