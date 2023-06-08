const router = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = require('../models/User.model');

/* GET home page */
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

router.get("/profile/:username", (req, res, next) => {
  User.findOne({username: req.params.username})
  .then((item)=> res.render("profile", item))
});

module.exports = router;
