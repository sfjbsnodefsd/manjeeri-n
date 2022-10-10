const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/process-pension",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Process Pension service DB  Connected`);
  }
);

app.listen(PORT, () => {
    console.log(`Process Pension service at ${PORT}`);
});