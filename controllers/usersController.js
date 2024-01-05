const User = require("../models/User");

// Admin
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users, total_users: users.length });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(404).json({ msg: `No user with id : ${userId}` });
  }
  res.status(201).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndRemove({ _id: userId });
  if (!user) {
    res.status(404).json({ msg: `No user with id : ${userId}` });
  }
  res.status(200).json({ msg: "Action was successfull" });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).json({ msg: `No user with id : ${userId}` });
  }
  res.status(200).json({ user });
};

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
