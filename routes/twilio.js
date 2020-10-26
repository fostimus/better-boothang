require("dotenv").config();
const express = require("express");
const db = require("../models");
const router = express.Router();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

router.get("/", function(req, res) {
  client.messages
    .create({
      body: "TESTING FROM THE ATOMIC CODE GHOSTS! boo",
      from: process.env.TWILIO_NUM,
      to: "+13103080831"
    })
    .then(message => {
      console.log(message.sid);
    });
  res.send("hey");
});

module.exports = router;
