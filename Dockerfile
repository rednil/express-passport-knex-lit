FROM node:lts-alpine
COPY . /app
ENV PORT 80
EXPOSE 80
ENV NODE_ENV production
CMD ["sh", "-c", "/app/node_modules/.bin/knex migrate:latest --env production && /app/node_modules/.bin/knex seed:run --specific=create_admin.js --env production && node /app/bin/www"]

