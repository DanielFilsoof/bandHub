const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret_key";

// Use an in-memory user store for demonstration purposes
const users = [
  {
    username: process.env.TEST_USER_EMAIL,
    password: bcrypt.hashSync(process.env.TEST_USER_PASSWORD, 10),
  },
];

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Helper function to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
}

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  // Set the token as an HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.json({ message: "Login successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
