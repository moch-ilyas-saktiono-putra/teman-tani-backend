const validateUser = (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Failed to create user, all fields are required",
    });
  }
  next();
};

module.exports = { validateUser };
