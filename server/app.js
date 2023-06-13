// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

// Initialize Express application
const app = express();

// Load environment variables
dotenv.config();

// Port number
const port = 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/", routes);

// Start server
app.listen(port, () => console.log("[SERVER]:", port));
