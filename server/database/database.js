// Import required modules
const mysql = require("mysql");

// Configure dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  // DOTENV
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

// Attempt to connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("[DATABASE]:" + connection.state);
});

module.exports = connection;
