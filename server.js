require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/ppConfig");
const isLoggedIn = require("./middleware/isLoggedIn");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

// use method override to handle PUT and DELETE requests elegantly
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", require("./routes/auth"));
app.use("/user", isLoggedIn, require("./routes/user"));

app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});

var server = app.listen(process.env.PORT || 8000, () =>
  console.log(
    `🎧You're listening to the smooth sounds of port ${process.env.PORT ||
      8000}🎧`
  )
);

module.exports = server;
