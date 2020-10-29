const express = require("express");
const passport = require("../config/ppConfig");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  const signInModal = {
    name: "sign-in-modal",
    title: "Sign In",
    body: "./modals/signup.ejs"
  };
  const howItWorksModal = {
    name: "how-it-works-modal",
    title: "How Better BooThang Works",
    body: "./modals/how-it-works.ejs"
  };
  res.render("index", {
    signInModal: signInModal,
    howItWorksModal: howItWorksModal
  });
});

router.get("/signup", (req, res) => {
  res.render("/signup");
});

router.post("/signup", (req, res) => {
  // find or create a user, providing the name and password as default values
  db.user
    .findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      }
    })
    .then(([user, created]) => {
      if (created) {
        // if created, success and login
        console.log("user created");
        passport.authenticate("local", {
          successRedirect: "/user",
          successFlash: "Account created and logged in"
        })(req, res);
      } else {
        // if not created, the email already exists
        req.flash("error", "Email already exists");
        res.redirect("/signup");
      }
    })
    .catch(error => {
      // if an error occurs, let's see what the error is
      req.flash("error", error.message);
      res.redirect("/signup");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "index",
    failureFlash: "Invalid username and/or password",
    successFlash: "You have logged in"
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have logged out");
  res.redirect("/");
});

module.exports = router;
