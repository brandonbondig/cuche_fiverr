// Import required modules
const mysql = require("mysql");
const uuid = require("uuid");

// Initialize the instance to be null
let instance = null;

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
  console.log("[DATABASE CONNECTION]: " + connection.state);
});

// Definition of the 'database' class
class database {
  // Singleton pattern to ensure only one instance of database
  static getInstance() {
    if (!instance) {
      instance = new database();
    }
    return instance;
  }

  // Method to create a new user
  async create_user(username, password, email) {
    const userExists = await this.user_exists(username, email);

    if (userExists) return { error: 409, message: "User already exists" };

    const id = uuid.v4();

    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO users (username, password, email, UUID) VALUES ('${username}', '${password}', '${email}', '${id}');`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
    } catch (error) {
      return { error: 500, message: error.message };
    }
    return { error: null, message: "User created" };
  }

  // Method to check if user exists
  async user_exists(username, email) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = '${username}' OR email='${email}'; `;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response.length != 0;
    } catch (error) {
      return { error: 500, message: error.message };
    }
  }

  // Method to login user
  async login(username, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = '${username}' AND password='${password}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return {
        status: response.length != 0,
        uuid: response[0]?.UUID,
        username: response[0]?.username,
        email: response[0]?.email,
      };
    } catch (error) {
      return { error: 500, message: error.message };
    }
  }

  // Method to verify user token
  async verify_token(token) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE UUID = '${token}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response.length != 0;
    } catch (error) {
      return { error: 500, message: error.message };
    }
  }

  // Method to get listings UUID, address, price, square_meters, description, image_url

  async get_all_listings() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM listings;`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      return { error: 500, message: error.message };
    }
  }

  async get_listing(UUID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM listings WHERE UUID = '${UUID}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      return { error: 500, message: error.message };
    }
  }

  async create_listing(
    UUID,
    created_by,
    title,
    address,
    price,
    square_meters,
    description,
    image_url
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO listings (UUID, created_by, title, address, price, square_meters, description, image_url) VALUES ('${UUID}', '${created_by}','${title}', '${address}', '${price}', '${square_meters}', '${description}', '${image_url}');`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
    } catch (error) {
      return { error: 500, message: error.message };
    }
    return { error: null, message: "Listing created", uuid: UUID };
  }
}

// Export the 'database' class as a module
module.exports = database;
