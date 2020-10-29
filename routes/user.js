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
  // set up add new boothang modal
  const addBoothangModal = {
    name: "add-boothang-modal",
    title: "Enter Your BooThang's Info",
    body: "./modals/add-new-boothang.ejs"
  };
  // Set up update Boothang modal
  const updateBoo = {
    name: "update-boothang",
    title: "Update Yo Boothang",
    body: "./modals/update-boo.ejs"
  };
  // set up send BooThang modal
  const sendToBoothangModal = {
    name: "send-boothang-modal",
    title: "Choose which BooThang",
    body: "./modals/send-to-boothang.ejs"
  };

  // get premade messages from json
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
          messages: messageData,
          addBoothangModal: addBoothangModal,
          updateBoo: updateBoo,
          sendToBoothangModal: sendToBoothangModal
        });
      });
    });
});

/**
 * Add New BooThang
 */
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
            `${createdBoothang.name} was found/created for ${returnedUser.firstName}.`
          );
        });
    });
  res.redirect("/user");
});

/**
 * SEND message to BooThangs route
 * - currently will send message to ALL BooThangs
 */
router.post("/messages", (req, res) => {
  console.log("*** MESSAGE IS: " + req.body.message);
  console.log("*** chosenBoothang IS: " + req.body.chosenBoothang);

  db.user
    .findOne({
      where: {
        email: req.user.email
      }
    })
    .then(returnedUser => {
      returnedUser.getBoothangs().then(boothangs => {
        boothangs.forEach(boothang => {
          // sendText(boothang.phoneNumber, req.body.message);
        });
      });
    });
  res.redirect("/user");
});

router.delete("/:id", (req, res) => {
  db.boothang
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deleteChick => {
      console.log(`Bye~ ${deleteChick.name}`);
    });
  res.redirect("/user");
});

router.put("/:id", (req, res) => {
  db.boothang
    .update(
      {
        name: req.body.newName,
        phoneNumber: req.body.newPhone
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(updateChick => {
      console.log(`${updateChick.name} Updated!`);
    });
  res.redirect("/user");
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
