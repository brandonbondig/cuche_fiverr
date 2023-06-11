// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./database.js");

// Initialize Express application
const app = express();

// Load environment variables
dotenv.config();

// Define port number
const port = 5001;

// Use necessary middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/verify", (req, res) => {
  const { token } = req.cookies;
  console.log("app verify");
  const result = database.getInstance().verify_token(req.cookies.token);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("app login");

  const result = database.getInstance().login(username, password);
  result
    .then((data) => {
      // Set cookie
      res.cookie("token", data.uuid, { maxAge: 900000, httpOnly: true });
      // Send response
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

// User existence check route
app.post("/user_exists", (req, res) => {
  const { username } = req.params;
  const { email } = req.params;
  console.log("app user_exists?");

  const result = database.getInstance().user_exists(username, email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// New user creation route
app.post("/create_user", (req, res) => {
  const { username, password, email } = req.body;

  const result = database.getInstance().create_user(username, password, email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log("voici mon erreure: ", err));
});

// Start server
app.listen(port, () => console.log("app is running on port:", port));
