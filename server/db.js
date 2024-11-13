const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // replace with your PostgreSQL username
  host: "localhost", // or your database host
  database: "postgres", // replace with your database name
  password: "P@$$w0rd", // replace with your password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
