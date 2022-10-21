const express = require("express")
const app = express()
const amqp = require("amqplib")
var  connection,channel;

async function connect() {
    try{
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("Rabbit");
        channel.consume('Rabbit', data => {
            console.log(`Received data from the producer: ${Buffer.from(data.content)}`)
        })
    } catch(err) {
        console.log(err)
    }
}

connect();

app.get("/send", (req,res) => {

})

app.listen(5000,()=>{
    console.log('Server running at 5000')
})