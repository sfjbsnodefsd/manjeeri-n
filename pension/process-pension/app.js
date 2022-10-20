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

const getPensionerDetail = (aadhaarno) => 
  new Promise((resolve, reject) => {
    request({
      url : `http://localhost:3002/pensioner/${aadhaarno}`,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGhhcm5vIjoiMjM0NTY3ODk4NzY4IiwibmFtZSI6Ik1hbmplZXJpMiIsImlhdCI6MTY2NjI3NDU0OH0.o6Rthm-VRxo9TTl7tRr8o4RDiCGNVL5m-jlS0DfGDd4'
      } 
    },
      (err, res, body) => {
        if (err) {
          return reject(err); 
        }
        resolve(JSON.parse(body));
      }
    );
  });

// calculate pension amount
const calculatePension = async (aadhaarno) => {

  const pensionerDetail = await getPensionerDetail(aadhaarno);
    if(pensionerDetail.sucess === 1 || JSON.stringify(pensionerDetail) === '{}'){
        return pensionerDetail
    } else {
      //const pensionerDetail = await Pensioner.findOne({adharno:adharno}).select('salaryearned allowances pensiontype bankdetail');

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

}

app.post("/ProcessPension", isAuthenticated, async (req, res) => {
  calculatePension(req.body.adharno)
  .then(pensionDetails => {
    if(pensionDetails && JSON.stringify(pensionDetails) !== '{}') {
      return res.json({success:true,pensionDetails})
    }else {
      return res.json({success:false})
    }
  })
});

app.listen(PORT, () => {
    console.log(`Process Pension service at ${PORT}`);
});