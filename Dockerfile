FROM node:22 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system -gid 1001 nodejs
RUN adduser --system -ui 1001 nextjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./.next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]

