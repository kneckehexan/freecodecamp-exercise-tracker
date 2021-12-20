const express = require('express');
const router = express.Router();
const {createUser, getAllUsers} = require('../controllers/users');
const {createExercise, getLog} = require('../controllers/exercise');

router.route('/').post(createUser).get(getAllUsers);
router.route('/:_id/exercises').post(createExercise);
router.route('/:_id/logs').get(getLog);

module.exports = router;