const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const Pensioner = require("./Pensioner");
const isAuthenticated = require("../isAuthenticated");
const request = require('postman-request')
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/auth-service",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Process Pension service DB  Connected`);
  }
);

// calculate pension amount
const calculatePension = async (adharno) => {

  const pensionerDetail = await Pensioner.findOne({adharno:adharno}).select('salaryearned allowances pensiontype bankdetail');

  const bankCharge = {
    'public' : 500,
    'private' : 500
  }
  const bankType = pensionerDetail.bankdetail.banktype
  const pensiontype = pensionerDetail.pensiontype
  let pensionAmountPercentage = 0;
  if(pensiontype == 'self'){
    pensionAmountPercentage = 80;
  }else{
    pensionAmountPercentage = 20;
  }
  let pensionAmount =  (pensionAmountPercentage * pensionerDetail.salaryearned)/100 + pensionerDetail.allowances;
  
  return {
    pensionAmount ,
    bankServiceCharge : bankCharge[bankType]
  }
}

app.post("/ProcessPension", isAuthenticated, async (req, res) => {
  calculatePension(req.body.adharno)
  .then(pensionDetails => {
    return res.json(pensionDetails)
  })
});

app.listen(PORT, () => {
    console.log(`Process Pension service at ${PORT}`);
});