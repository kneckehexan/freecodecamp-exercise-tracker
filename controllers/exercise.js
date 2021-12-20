const Exercise = require('../models/Exercise');
const User = require('../models/User');
const {BadRequestError, NotFoundError} = require('../errors');

const createExercise= async (req, res) => {
  const user = await User.findById(req.params._id);
  if(!user){
    throw new NotFoundError('No user with id ' + req.params._id);
  }

  // if date is an empty string from the form, set it as undefined, otherwise the Schema model will return 'null' which doesn't work
  // Not bothering to check for other occurances, such as a wrongfully entered date or the like.
  if(req.body.date === ''){
    req.body.date = undefined;
  }

  req.body.userid = user._id;
  const exercise = await Exercise.create(req.body);

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
    _id: user._id
  });
}

const getLog = async (req, res) => {
  const user = await User.findById(req.params._id);

  var query = {
    userid: user._id,
    date: {}
  }

  if(req.query.from !== undefined){
    query.date.$gte = new Date(req.query.from);
  }

  if(req.query.to !== undefined){
    query.date.$lt = new Date(req.query.to);
    query.date.$lt.setDate(query.date.$lt.getDate() + 1);
  }

  if(Object.keys(query.date).length === 0){
    delete query.date;
  }

  if(req.query.limit !== undefined){
    req.query.limit = parseInt(req.query.limit);
  }

  const userlogs = await Exercise.find({...query})
    .limit(req.query.limit);

  const log = userlogs.map( x => ({
    description: x.description,
    duration: x.duration,
    date: x.date.toDateString()
  }))
  res.json({
    username: user.username,
    count: userlogs.length,
    log: log
  });
}

module.exports = {
  createExercise,
  getLog
}