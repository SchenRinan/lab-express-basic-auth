const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

/* GET home page */
//To eliminate redundancy and to simulate what I always see in FB, I decided to move /main to homepage ('/')
//and simply add a private page
router.get("/", (req, res, next) => {
  console.log(req.session)
  if(req.session.currentUser){
    res.render("index", {loggedIn: true});
  }
  else {
    res.render("index")
  }
});

router.post("/", (req, res, next) => {
  console.log('SESSION =====> ', req.session);
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
