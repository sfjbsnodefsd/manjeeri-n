const express = require('express');

const app = express();

app.get("/", (req,res) => res.send('Hello'))

app.listen(6000,()=>{
    console.log('Started')
})