// Import required modules
const mysql = require("mysql");

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  // DOTENV
  host: "localhost",
  user: "admin",
  password: "password",
  port: 3306,
  database: "cuche",
});

// Attempt to connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("[DATABASE]:" + connection.state);
});

module.exports = connection;
