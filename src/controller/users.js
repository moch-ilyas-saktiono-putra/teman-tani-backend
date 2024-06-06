const userModels = require("../models/users");

// get all user
const getAllUsers = async (req, res) => {
  try {
    const [data] = await userModels.getAllUsers();
    res.json({
      message: "GET ALL DATA FROM users",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      serverMessage: error,
    });
  }
};

// Regist
const register = (req, res) => {
  const id = ree;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.nody.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
};

// Login

// Log Out

module.exports = {
  getAllUsers,
};
