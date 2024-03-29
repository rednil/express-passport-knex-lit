# express-passport-knex-lit

A fullstack starter for little projects requiring authentication and user management. Based on [express](https://expressjs.com), [passport](https://www.passportjs.org/), [knex](https://knexjs.org/) and [lit](https://lit.dev/), automatically packed into a [docker](https://www.docker.com/) container using a [github action](https://github.com/features/actions).  

The frontend was generated using [npm init @open-wc](https://github.com/open-wc/create).

The backend was generated using [npx express-generator](https://github.com/expressjs/generator).

During the docker build, the frontend build is copied from frontend/dist to backend/public, from where express serves static files. The backend is then wrapped up into the official lts-slim node image from [dockerhub](https://hub.docker.com/_/node). Knex is configured to use [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) in [knexfile.js](https://github.com/rednil/express-passport-knex-lit/blob/main/backend/knexfile.js). If used in a docker container, the following environmental parameters are available:

* ADMIN_USERNAME (only changed **if no admin exists in the database yet**, defaults to "admin")
* ADMIN_PASSWORD (only changed **if no admin exists in the database yet**, defaults to "admin")
* SESSION_SECRET (Using a secret that cannot be guessed will reduce the ability to hijack a session, see [here](http://expressjs.com/en/resources/middleware/session.html))

For development, execute
```
npm run init
```
in order to create a database for development purposes and create one admin (password "admin") and one user (password "user").

```
npm start
```
This will serve the frontend using [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) on port 8000 and the backend using [nodemon](https://nodemon.io/) on port 3000, both watching for file changes and restarting the backend or reloading the web page on every file change. The frontend dev-server is configured to forward all calls to /api/ to the backend port.

All this is configured on Linux, I am sure you need several changes in the package.json files for development on Windows.
