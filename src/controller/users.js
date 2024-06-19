const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Regist
const createNewUser = async (req, res) => {
  // filled foorm check
  if (!req.body.username) {
    return res.status(400).json({
      message: "Username is required.",
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      message: "Email is required.",
    });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({
      message: "Invalid email format. Please enter a valid email address.",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      message: "Password is required.",
    });
  }

  if (!req.body.password.length > 7) {
    return res.status(400).json({
      message: "Your password must be at least 8 characters long",
    });
  }

  const { username, email, password } = req.body;

  const usedEmail = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (usedEmail) {
    return res.status(400).json({
      message: "Email has already been used",
    });
  }

  const usedUsername = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (usedUsername) {
    return res.status(400).json({
      message: "Username has already been used",
    });
  }

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
      message: "User successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      serverMessage: error,
    });
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (!email) {
    return res.status(404).json({
      message: "Email not found",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (isPassword) {
    const payLoad = {
      id: user.id,
    };

    // const secret = process.env.JWT_SECRET;

    // const expiresIn = 60 * 60 * 1;

    // const token = jwt.sign(payLoad, secret, { expiresIn: expiresIn });
    // console.log(token);

    // res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      // token: token,
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
};

const userProfile = async (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      email: true,
    },
  });

  if (!userData) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    data: {
      username: userData.username,
      email: userData.email,
    },
  });
};

module.exports = {
  createNewUser,
  userLogin,
  userProfile,
};
