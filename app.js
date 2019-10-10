const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const path = require("path");
const session = require("express-session");
const PORT = 3000;
const Gpio = require("onoff").Gpio;

const gpioswitch = new Gpio(4, "out"); // creating a new output relationship with pin 4

app.use(
  session({
    secret: "this isnt very secretive when posted to github",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("styles"));

const VIEWS_PATH = path.join(__dirname, "/views");

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

let users = [{ username: "default", password: "1234" }];

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let username = "default";
  let password = req.body.password;

  let persistedUser = users.find(user => {
    return user.username == username && user.password == password;
  });

  if (persistedUser) {
    if (req.session) {
      req.session.password = persistedUser.password;
      res.render("index");
    }
  } else {
    res.render("login", { message: "Invalid password" });
  }
});

app.post("/passwordUpdate", (req, res) => {
  let password = req.body.password;
  let password2 = req.body.password2;

  if (password == password2) {
    users = [{ username: "default", password: password }];
    res.render("index", { message: "Success!" });
  } else {
    res.render("index", { message: "Passwords did not match" });
  }
});

app.post("/buttonPressed", (req, res) => {
  // untested!!!
  gpioswitch.writeSync(1);
  setTimeout(gpioswitch.writeSync(0), 10000);
  res.render("index", { message: "Unlocked!" });
});

app.get("/:anything", (req, res) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
