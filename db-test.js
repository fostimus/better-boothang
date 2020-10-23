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
          name: "Gayle"
        }
      })
      .then(([returnedBooThang, created]) => {
        returnedUser.addBoothang(returnedBooThang);
        console.log("---------");
        console.log(`${returnedUser.firstName} added ${returnedBooThang.name}`);
      });
  });
