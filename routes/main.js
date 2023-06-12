const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

router.get("/main", (req, res, next) => {
    if(req.session.currentUser){
      res.render("main", {user: req.session.currentUser, loggedIn: true});
    }
    else {
      res.redirect("/")
    }
});

module.exports = router;