require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import Router
const userRouters = require("./routes/users");

// Router
app.use("/users", userRouters);

// server
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
