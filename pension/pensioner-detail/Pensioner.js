const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PensionerSchema = new Schema({
    name: String,
    dob: Date,
    password: String,
    pancard: String,
    adharno: String,
    salaryearned: Number,
    allowances: Number,
    pensiontype: String,
    bankdetail: JSON,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("user", PensionerSchema);