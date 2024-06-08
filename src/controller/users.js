const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Regist
const createNewUser = async (req, res) => {
  // filled foorm check
  if (
    !req.body.username ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.password ||
    !req.body.email
  ) {
    return res.status(400).json({
      message: "Failed to create user, all fields are required",
    });
  } else if (!validator.isEmail(req.body.email)) {
    return res.status(400).json({
      message: "Format email salah",
    });
  }

  const { username, first_name, last_name, email, password } = req.body;

  const usedEmail = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  if (usedEmail) {
    return res.status(400).json({
      message: "Email has beed used",
    });
  }

  const usedUsername = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });

  if (usedUsername) {
    return res.status(400).json({
      message: "Username has beed used",
    });
  }

  if (!password.length > 7) {
    return res.status(400).json({
      message: "Password length must be more than 8 characters",
    });
  }

  const hashedPasword = await bcrypt.hash(password, 10);

  console.log(username, first_name, last_name, password, email);

  try {
    const sendData = await prisma.users.create({
      data: {
        username: username,
        first_name: first_name,
        last_name: last_name,
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

const userLogin = async (req, res) => {
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
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    const secret = process.env.JWT_SECRET;

    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payLoad, secret, { expiresIn: expiresIn });

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      data: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } else {
    return res.status(403).json({
      message: "Wrong password",
    });
  }
};

const userProfile = async (req, res) => {
  const userData = await prisma.user.findUnique({
    where : {
      id : id
    }
  })
}

module.exports = {
  createNewUser,
  userLogin,
};
