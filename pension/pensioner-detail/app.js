const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const cors = require("cors");
const Pensioner = require("./Pensioner");
const isAuthenticated = require("../isAuthenticated");
app.use(express.json());
app.use(cors())

mongoose.connect(
  "mongodb://localhost:27017/auth-service",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Pensioner service DB Connected`);
  }
);

app.get("/pensioner/:adharno", async (req, res) => {
  try {
    const pensionerDetail = await Pensioner.findOne({adharno:req.params.adharno})
    .select('-_id -password -created_at -__v');

    const response = {}

    if(pensionerDetail){
      return res.json({
        status: true,
        pensionerDetail
      })

    }else {    
      throw(response.message)
    }

  } catch(err) {
    return res.json({
      status: false,
      message: err
    })
  }

 });

app.listen(PORT, () => {
  console.log(`product service is working at port 3002`);
});