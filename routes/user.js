require("dotenv").config();
const express = require("express");
const db = require("../models");
const router = express.Router();
const fs = require("fs");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

router.get("/", (req, res) => {
  res.render("user/booInfo.ejs");
});

router.post("/", function(req, res) {
  sendText(req.body.phoneNumber);
  res.redirect("/profile");
});

router.get("/messages", (req, res) => {
  const messages = fs.readFileSync("./sample-messages.json");
  const messageData = JSON.parse(messages);

  res.render("user/messages", { messages: messageData });
});

router.post("/messages", (req, res) => {
  sendText(req.body.phoneNumber, req.body.message);
  res.redirect("/profile");
});

const sendText = (phoneNumber, message) => {
  const messageToSend = message || "TESTING FROM THE ATOMIC CODE GHOSTS! boo";
  client.messages
    .create({
      body: messageToSend,
      from: process.env.TWILIO_NUM,
      to: phoneNumber
    })
    .then(message => {
      console.log(message.sid);
    });
};

module.exports = router;
