const User = require('../models/User');
const Exercise = require('../models/Exercise');

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json({username: user.username, _id: user._id});
}

const getAllUsers = async (req, res) => {
  const users = await User.find().sort({username: 'desc'});
  res.json(users);
}

module.exports = {
  createUser,
  getAllUsers,
}