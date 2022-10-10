const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const User = require("./User");
const jwt = require("jsonwebtoken");
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/auth-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`auth service DB  Connected`);
  }
);

// register
app.post("/auth/reg", async (req, res) => {
  const { adharno } = req.body;
  const userExists = await User.findOne({ adharno });
  if (userExists) {
    return res.json({ sucess: 0, message: "User already exists" });
  } else {
    const newUser = new User({...req.body});
    newUser.save();
    return res.json(newUser);
  }
});

// login

app.post("/auth/login", async (req, res) => {
  const { adharno, password } = req.body;

  const user = await User.findOne({ adharno });
  if (!user) {
    return res.json({ sucess: 0, message: "User does not exist" });
  } else {
    if (password !== user.password) {
      return res.json({ sucess: 0, message: "Incorrect password" });
    }
    const payload = {
      adharno,
      name: user.name,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else {
        return res.json({ token: token });
      }
    });
  }
});


app.listen(PORT, () => {
  console.log(`Auth service at ${PORT}`);
});