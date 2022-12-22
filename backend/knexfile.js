module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/dev.better-sqlite3"
    },
    useNullAsDefault: true,
  },
  test: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/test.better-sqlite3"
    },
    useNullAsDefault: true
  },
  production: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/prod.better-sqlite3"
    },
    useNullAsDefault: true
  },
}
