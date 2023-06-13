const uuid = require("uuid");
const connection = require("../database.js");

// Initialize the instance to be null
let instance = null;

/**
 * Class to handle all database operations
 * @class database
 * @classdesc This class is a singleton class
 * @exports database
 */
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

  // Method to get all listings
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

  // Method to get listing by UUID
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

  // Method to get listings by user
  async get_listings_by_user(UUID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM listings WHERE created_by = '${UUID}';`;
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

  // Method to create a new listing
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

  // Method to delete a listing
  async delete_listing(UUID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `DELETE FROM listings WHERE UUID = '${UUID}';`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
    } catch (error) {
      return { error: 500, message: error.message };
    }
    return { error: null, message: "Listing deleted", uuid: UUID };
  }
}

// Export the 'database' class as a module
module.exports = database;
