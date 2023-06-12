const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

router.get("/private", (req, res, next) => {
    if(req.session.currentUser ){
      res.render("private", {user: req.session.currentUser, loggedIn: true});
    }
    else {
      res.redirect("/")
    }
});

module.exports = router;