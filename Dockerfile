FROM node:18-alpine AS base

WORKDIR /app
COPY . .
COPY .env.production .

LABEL maintainer=gilang@vcgamers.com

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]