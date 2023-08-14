import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from 'kafkajs';
   
const kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] }
const kafka = new Kafka(kafkaConfig)
const consumer = kafka.consumer({ groupId: 'test-group' })

async function init(){
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        console.log({
        value: message.value?.toString(),
        })
    },
    })
}
