require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Router
const userRouters = require("./routes/users");

// Router
app.use("/users", userRouters);

// server
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
