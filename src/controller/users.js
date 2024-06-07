const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

  const { username, email, password } = req.body;
  const hashedPasword = await bcrypt.hash(password, 10);

  try {
    const sendData = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashedPasword,
      },
    });
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

const userLogin = (req, res) => {

}

module.exports = {
  createNewUser,
  userLogin,
};
