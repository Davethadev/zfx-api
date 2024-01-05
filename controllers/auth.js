const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ msg: "Invalid Credentials" });
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(401).json({ msg: "Invalid Credentials" });
  }
  const token = user.createJWT();
  res.status(200).json({ user, token });
};

module.exports = {
  register,
  login,
};
