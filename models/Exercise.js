const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user id'],
  },
  description : {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: 100
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a duration time']
  },
  date: {
    type: Date,
    default: () => new Date()
  }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);