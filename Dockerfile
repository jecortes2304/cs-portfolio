# Fase de build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código
COPY . .

# Compilar Next.js
RUN npm run build

# Fase de producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar desde builder solo lo necesario
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
