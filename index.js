const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running in port 3000");
});

app.get("/", (req, res) => {
  res.set("Content-Type", "text");
  res.send(`Hello ${req.body.name}`);
});
