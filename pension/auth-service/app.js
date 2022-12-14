const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require('cors');
const PORT = 3001;
const User = require("./User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
app.use(express.json());
app.use(cors())

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
  try {
    const { adharno,password } = req.body;
    let userExists;
    if(adharno && adharno.length)
      userExists = await User.findOne({ adharno });
    else
      throw('Aadhar Number cannot be empty')
    if (userExists) {
      throw("User already exists")
    } else {
      const encryptedPassword = bcrypt.hashSync(password, salt);
      req.body.password = encryptedPassword
      const newUser = new User({...req.body});
      newUser.save();
      return res.json({
        status: true,
        message: 'Account created Successfully'
      });
    }
  } catch (err) {
    return res.json({
      status: false,
      message: err
    });
  }
});

// login

app.post("/auth/login", async (req, res) => {
  try{
    const { adharno, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, salt);
    let user;
    if(adharno && adharno.length){
      user = await User.findOne({ adharno });
    }
    else
      throw('Aadhar Number cannot be empty');
    if (!user) {
      throw("User does not exist");
    } else {
      if (encryptedPassword !== user.password) {
        throw("Incorrect password");
      }
      const payload = {
        adharno,
        name: user.name,
      };
      jwt.sign(payload, "aderhY6688SelfcSlo87u9", {expiresIn:'1d'},(err, token) => {
        if (err) {
          throw(err)
        }
        else {
          return res.json({ 
            status: true,
            token: token,
            adharno: adharno,
            message: 'Logged In successfully.'
          });
        }
      });
    }
      
  } catch(error) {
    return res.json({
      status: false,
      message: error
    });
  }
});


app.listen(PORT, () => {
  console.log(`Auth service at ${PORT}`);
});