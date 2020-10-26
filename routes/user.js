require("dotenv").config();
const express = require("express");
const db = require("../models");
const router = express.Router();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

router.get("/", (req, res) => {
  res.render("user/booInfo.ejs");
});

router.post("/", function(req, res) {
  client.messages
    .create({
      body: "TESTING FROM THE ATOMIC CODE GHOSTS! boo",
      from: process.env.TWILIO_NUM,
      to: req.body.phoneNumber
    })
    .then(message => {
      console.log(message.sid);
    });
  res.send("hey");
});

router.get("/messages.ejs", (req, res) => {
  res.render("auth/messages.ejs");
});

module.exports = router;
