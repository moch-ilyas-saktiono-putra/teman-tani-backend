require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Import Router
const userRouters = require('./routes/users')

// Router
app.use('/users', userRouters)

// server
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
