const db = require("./models");

db.user
  .findOrCreate({
    where: {
      firstName: "Derek",
      lastName: "Demetopolous"
    }
  })
  .then(([returnedUser, created]) => {
    db.boothang
      .findOrCreate({
        where: {
          name: "Linda"
        }
      })
      .then(([returnedBooThang, created]) => {
        returnedUser.addBoothang(returnedBooThang);
        console.log("---------");
        console.log(`${returnedUser.firstName} added ${returnedBooThang.name}`);
      });
  });

db.user
  .findOrCreate({
    where: {
      firstName: "Linda",
      lastName: "Belcher"
    }
  })
  .then(([returnedUser, created]) => {
    returnedUser
      .createBoothang({
        name: "Bob"
      })
      .then(boothang => {
        console.log("---------");
        console.log(`${returnedUser.firstName} created ${boothang.name}`);
      });
  });

db.user.findOne().then(user => {
  user.getBoothangs().then(boothangs => {
    boothangs.forEach(function(boothang) {
      console.log("---------");
      console.log(`${user.firstName} has BooThang ${boothang.name}`);
    });
  });
});
