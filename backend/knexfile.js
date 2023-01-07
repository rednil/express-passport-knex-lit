module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/dev.better-sqlite3"
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/development',
    }
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/test.better-sqlite3"
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/test',
    }
  },
  production: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/prod.better-sqlite3"
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/production',
    }
  },
}
