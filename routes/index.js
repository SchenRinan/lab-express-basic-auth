const router = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = require('../models/User.model');

/* GET home page */
//To eliminate redundancy and to simulate what I always see in FB, I decided to move /main to homepage ('/')
//and simply add a private page
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/", (req, res, next) => {
  const hashpassword = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    password: hashpassword,
  })
  .then(() => res.redirect(`/profile/${req.body.username}`))
});

module.exports = router;
