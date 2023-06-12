const router = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = require('../models/User.model');

module.exports = router;