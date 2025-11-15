FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20 AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]