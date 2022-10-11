const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const Pensioner = require("./Pensioner");
const isAuthenticated = require("../isAuthenticated");
app.use(express.json());
var channel, connection;

mongoose.connect(
  "mongodb://localhost:27017/auth-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Pensioner service DB  Connected`);
  }
);

app.get("/pensioner/:adharno", isAuthenticated, async (req, res) => {
  const pensionerDetail = await Pensioner.findOne({adharno:req.params.adharno}).select('-_id -password -created_at -__v');
  return res.json(pensionerDetail)
});

app.listen(PORT, () => {
  console.log(`product service is working at port 3002`);
});