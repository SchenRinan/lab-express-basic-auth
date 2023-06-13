const router = require("express").Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const User = require('../models/User.model');

router.get("/signup", (req, res, next) => {
    if(req.session.currentUser){
      res.redirect('/')
    }
    else {res.render("signup");}
  });

router.post("/signup", (req, res, next) => {
    const hashpassword = bcrypt.hashSync(req.body.password, salt);
    User.create({
      username: req.body.username,
      password: hashpassword,
    })
    .then(() => res.redirect(`/`))
    .catch((err) => {
      res.render('signup', {error: err})
      console.error("Error connecting to mongo: ", err);
    });
  });

module.exports = router;