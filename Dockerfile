FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install --ignore-scripts
RUN pnpm run build

FROM node:22-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts

#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["pnpm", "run", "start"]
