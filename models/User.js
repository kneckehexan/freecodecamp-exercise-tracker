const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    maxlength: 20
  }
});

module.exports = mongoose.model('User', UserSchema);