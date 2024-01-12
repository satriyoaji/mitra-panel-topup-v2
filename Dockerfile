FROM node:18-alpine AS base

WORKDIR /app
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env.production .

RUN yarn install && yarn build

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]