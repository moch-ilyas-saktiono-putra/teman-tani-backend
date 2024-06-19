require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Router
const userRouters = require("./routes/users");
const predictionRouters = require('./routes/predictions')
const weatherRouters = require('./routes/weather')
const articleRouters = require('./routes/article')

// Router
app.use("/user", userRouters);
app.use("/prediction", predictionRouters)
app.use("/weather", weatherRouters)
app.use("/article", articleRouters)

// server
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
