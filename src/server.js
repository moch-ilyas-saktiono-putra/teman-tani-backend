require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

const userRouters = require("./controller/users");

app.use("/users", userRouters.getAllUsers);

const weatherRouters = require("./routes/weathers");

app.use("/weathers", weatherRouters);

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
