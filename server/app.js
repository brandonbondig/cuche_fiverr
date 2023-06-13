// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./database.js");
const uuid = require("uuid");
// Initialize Express application
const app = express();

// Load environment variables
dotenv.config();

// Define port number
const port = 5001;

// Use necessary middleware
app.use(
  cors({
    origin: "http://localhost:8080", // replace with the domain of your frontend app
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Parse cookies

// Home route
app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/verify", (req, res) => {
  const result = database.getInstance().verify_token(req.cookies.token);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

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

app.get("/get_all_listings", (req, res) => {
  const result = database.getInstance().get_all_listings();
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.get("/get_listing/:id", (req, res) => {
  const { id } = req.params;
  const result = database.getInstance().get_listing(id);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.get("/get_user_listings", (req, res) => {
  const { token } = req.cookies;
  const result = database.getInstance().get_user_listings(token);
  result

    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/create_listing", (req, res) => {
  const { title, address, price, square_meters, description, image_url } =
    req.body;
  //get token from cookie
  const created_by = req.cookies.token;

  const result = database
    .getInstance()
    .create_listing(
      uuid.v4(),
      created_by,
      title,
      address,
      price,
      square_meters,
      description,
      image_url
    );
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Start server
app.listen(port, () => console.log("app is running on port:", port));
