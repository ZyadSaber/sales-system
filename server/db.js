const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DATABASE_USER, // replace with your PostgreSQL username
  host: process.env.DATABASE_HOST, // or your database host
  database: "postgres", // replace with your database name
  password: process.env.DATABASE_PASSWORD, // replace with your password
  port: process.env.DATABASE_PORT, // default PostgreSQL port
});

module.exports = pool;
