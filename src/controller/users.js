const userModels = require("../models/users");
const validator = require("validator");

// Regist
const createNewUser = async (req, res) => {
  // filled foorm check
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({
      message: "Failed to create user, all fields are required",
    });
  } else if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({
      message: "Format email salah",
    });
  }

  const { body } = req;

  try {
    await userModels.createNewUser(body);
    return res.status(201).json({
      message: "User success created",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      serverMessage: error,
    });
  }
};

module.exports = {
  createNewUser,
};
