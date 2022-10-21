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
    } catch(err) {
        console.log(err)
    }
}

connect();

app.get('/send', async (req,res) => {
    const fakeData = {
        name: "Manjeeri",
        company: "TCS"
    }
    await channel.sendToQueue("Rabbit",Buffer.from(JSON.stringify(fakeData)))
    await channel.close();
    await connection.close();
    return res.send("done");
})

app.listen(3000,()=>{
    console.log('Server running at 3000')
})