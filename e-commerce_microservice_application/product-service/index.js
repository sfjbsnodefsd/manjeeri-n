const express = require("express")
require('dotenv').config();
const app = express()
const PORT = process.env.PORT;
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const amqp = require("amqplib")
mongoose.connect("mongodb://localhost:27017/product-service",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('db connected')
})
app.use(express.json())

async function connect() {
    const amqpServer = "amqp://localhost:5672"
    connection = await amqp.connect(amqpServer)
    channel = await connection.createChannel()
    await channel.assertQueue("PRODUCT")
}
connect()

app.listen(PORT, () => {
    console.log(`Product service is running at ${PORT}`)
})