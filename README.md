# express-lit-docker

A fullstack starter for little projects based on [express](https://expressjs.com) and [lit](https://lit.dev/), automatically packed into a docker container using a github action.

The frontend was generated using [npm init @open-wc](https://github.com/open-wc/create).

The backend was generated using [npx express-generator](https://github.com/expressjs/generator).

During the docker build, the frontend build is copied from frontend/dist to backend/public, from where express serves static files. The backend is then wrapped up into the official lts-alpine node image from [dockerhub](https://hub.docker.com/_/node).

For development, execute

```
npm start
```

in the top folder. 

This will serve the frontend using [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) on port 8000 and the backend using [nodemon](https://nodemon.io/) on port 3000, both watching for file changes and restarting the backend or reloading the web page on every file change. The frontend dev-server is configured to forward all calls to /api/ to the backend port. For demonstration purposes, I added a little button on the front page to trigger a request.

All this is configured on Linux, I am sure you need several changes in the package.json files for development on Windows.
