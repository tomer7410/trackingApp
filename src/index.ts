import { Kafka, KafkaConfig, Producer } from 'kafkajs';

const SOUTH_LIMIT = 34.7791
const EAST_LIMIT = 32.0416
const WEST_LIMIT = 32.0505
const NORTH_LIMIT = 34.7855
const kafkaConfig: KafkaConfig = { brokers: ['127.0.0.1:9092'] }
const kafka = new Kafka(kafkaConfig)
const producer = kafka.producer()
let index =1
function getRandomFloat(min: number, max: number, decimals:number) {
    const str = (Math.random() * (max - min) + min).toFixed(
      decimals,
    );
  
    return parseFloat(str);
}


producer.connect().then(()=>{
    setInterval(()=>{
        let randomEast = getRandomFloat(32.0416,32.0505,4)
        let randomNorth = getRandomFloat(34.7791,34.7855,4)  
        producer.send({
            topic: 'Tutorial2.pets',
            messages: [
              { value: JSON.stringify({ location: {
                type: "Point", coordinates:[randomNorth,randomEast]
            },'_id':`${Math.floor(Math.random() * 1000)}`})},
            ],
        })
        index++
    },1000)
    
}
)
