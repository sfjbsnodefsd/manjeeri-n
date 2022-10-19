console.log("producer");
import  Kafka from 'node-rdkafka'

const stream = Kafka.createWriteStream(
    {
        "metadata.broker.list":"localhost:9092"
    },
    {},
    {topic:'test'}
);

const queueMessage = () =>{
    const success = stream.write(Buffer.from("My name is Manjeeri."))
    if(success) {
        console.log('message published successfully')
    }else{
        console.log('Something went wrong')
    }
} 

setInterval(() => {
    queueMessage();
},3000)