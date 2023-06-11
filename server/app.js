const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const port = 5001; // ou le port spécifié

const database = require("./database.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("app login");
  const result = database.getInstance().login(username, password);
  result
    .then((data) => {
      // set cookie
      res.cookie("token", data.uuid, { maxAge: 900000, httpOnly: true });
      // send response
      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

app.get("/user_exist/:username", (req, res) => {
  const { username } = req.params;
  console.log("app user_existe?");
  const result = database.getInstance().user_exists(username);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.post("/new_user/", (req, res) => {
  const { username, password, email } = req.body;

  const result = database.getInstance().create_user(username, password, email);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log("voici mon erreure: ", err));
});

app.get("/search/:username/:password", (req, res) => {
  const { username, password } = req.params;
  const db = dbService.getDbServiceInstance();
  const result = db.searchByuser_name(username, password);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

//app.get('/getAll',(req,res)=>{console.log('test')})
app.listen(port, () => console.log("app is running on port:", port));
