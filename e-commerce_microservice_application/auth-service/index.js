const express = require('express')
const mongoose = require('mongoose');
const User = require('./User');
const jwt = require("jsonwebtoken")

mongoose.connect("mongodb://localhost:27017/auth-service",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('db connected')
})
const app = express();
const port = 5000;
app.use(express.json())

app.post('/',()=>{
    return res.json({})
})

// users list
app.get("/allusers", async (req,res) =>{
    const allUsers = await User.find({})
    return res.json(allUsers)
})

//register
app.post("/auth/reg", async(req,res) => {
    const {email, password, name} = req.body;
    const userExists = await User.findOne({email});
    if(userExists) {
        return res.json({
            success : 0,
            message : "User already exists!"
        })
    }else{
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.save()
        return res.json(newUser)
    }
})

//login
app.post("/auth/login", async (req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({email});
    if(!user){
        return res.json({success:0, message: "User does not exist"})
    } else {
        if(password !== user.password) {
            return res.json({success : 0, message : "Incorrect Password"})
        }
        const payload = {
            email,
            name : user.name
        }
        jwt.sign(payload, "Manjeeri$1234", (err,token) => {
            if(err) console.log(err);
            else{
                return res.json({token})
            }
        })
    }
})



app.listen(port,()=>{
    console.log(`Auth service running at http://localhost:${port}`);
})