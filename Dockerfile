FROM node:lts-alpine
# build directory is "backend"
COPY . /app
ENV PORT 80
EXPOSE 80
CMD ["sh", "-c", "node /app/bin/www"]

