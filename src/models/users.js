const dbPool = require("../config/database");
const bcrypt = require("bcrypt");

const createNewUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const SQLQuery =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  const values = [body.username, hashedPassword, body.email];

  return dbPool.execute(SQLQuery, values);
};

module.exports = {
  createNewUser,
};
