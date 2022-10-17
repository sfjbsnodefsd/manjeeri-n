
const express = require('express');

const app = express();

app.get("/test",(req,res) => {
    res.send("hey how are doing")
})

app.get("/test/subjects", (req,res) => {
    res.send(["maths","science","geography"])
})

const add = (a,b) => {
    return a+b;
}

module.exports = { app, add };
app.listen(4000, ()=> {console.log('Listening to port 4000') })
