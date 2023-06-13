const express = require("express");
const router = express.Router();
const database = require("../database/utils/utils.js");
const uuid = require("uuid");

// Home route
router.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

router.post("/verify", (req, res) => {
  const result = database.getInstance().verify_token(req.cookies.token);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Login route
router.post("/login", (req, res) => {
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
router.post("/user_exists", (req, res) => {
  const { username } = req.params;
  const { email } = req.params;

  const result = database.getInstance().user_exists(username, email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// New user creation route
router.post("/create_user", (req, res) => {
  const { username, password, email } = req.body;

  const result = database.getInstance().create_user(username, password, email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log("voici mon erreure: ", err));
});

router.get("/get_all_listings", (req, res) => {
  const result = database.getInstance().get_all_listings();
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.get("/get_listing/:id", (req, res) => {
  const { id } = req.params;
  const result = database.getInstance().get_listing(id);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.get("/get_user_listings", (req, res) => {
  const { token } = req.cookies;
  const result = database.getInstance().get_user_listings(token);
  result

    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.post("/create_listing", (req, res) => {
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

router.post("/get_listings_by_user", (req, res) => {
  const { token } = req.cookies;
  const result = database.getInstance().get_listings_by_user(token);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.post("/delete_listing", (req, res) => {
  const { id } = req.body;
  const result = database.getInstance().delete_listing(id);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

module.exports = router;
