const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

router.get("/", (req, res, next) => {
  if(req.session.currentUser){
    res.render("index", {user: req.session.currentUser, loggedIn: true});
  }
  else {
    res.render("index")
  }
});

router.post("/", (req, res, next) => {
  User.findOne({
    username: req.body.username
  })
  .then((userInside) => {
    if (!userInside){res.render('index', {inform: 'Username does not exist'})}
    else if(!bcrypt.compareSync(req.body.password, userInside.password)){
        res.render('index', {inform: 'Password is incorrect', user: userInside})}
    else {
      req.session.currentUser = userInside;
      res.render('index', {inform: 'Password is correct', user: userInside, loggedIn: true})
    }
  })
});

module.exports = router;
