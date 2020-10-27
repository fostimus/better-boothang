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
  const messages = fs.readFileSync("./sample-messages.json");
  const messageData = JSON.parse(messages);

  db.user
    .findOrCreate({
      where: {
        email: req.user.email
      }
    })
    .then(([returnedUser, created]) => {
      returnedUser.getBoothangs().then(boothangs => {
        let newBoothang = false;
        if (boothangs.length < 1) {
          newBoothang = true;
        }
        res.render("user/boothang", {
          newBoothang: newBoothang,
          boothangs: boothangs,
          messages: messageData
        });
      });
    });
});

router.post("/", function(req, res) {
    sendText(req.body.phoneNumber);
    db.user
        .findOrCreate({
            where: {
                email: req.user.email
            }
        })
        .then(([returnedUser, created]) => {
            returnedUser
                .createBoothang({
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber
                })
                .then(createdBoothang => {
                    console.log(createdBoothang);
                    console.log(
                    `${createdBoothang.name} was found/    created for ${returnedUser.firstName}.`
                );
            });
        });
    res.redirect("/profile");
});

/**
 * SEND message to BooThangs route
 * - currently will send message to ALL BooThangs
 */
router.post("/messages", (req, res) => {
  db.user
    .findOne({
      where: {
        email: req.user.email
      }
    })
    .then(returnedUser => {
      returnedUser.getBoothangs().then(boothangs => {
        boothangs.forEach(boothang => {
          sendText(boothang.phoneNumber, req.body.message);
        });
      });
    });
  res.redirect("/profile");
});

/**
 * TODO: implement delete route
 * TODO: Add an "update" button for the BooThang
 */
router.delete("/", (req, res) => {
  res.redirect("/");
});

/**
 * helper functions
 */
const sendText = (phoneNumber, message) => {
  // only execute if we have a phone number and a message
  if (phoneNumber && message) {
    client.messages
      .create({
        body: message,
        from: process.env.TWILIO_NUM,
        to: phoneNumber
      })
      .then(message => {
        console.log(message.sid);
      });
  }
};

module.exports = router;
