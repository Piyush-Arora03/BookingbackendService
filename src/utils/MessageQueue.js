const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL, QUEUE_NAME, EXCHANGE_NAME} = require('../config/index');
let channel;
const createChannel=async()=>{
    try {
        if(channel) {
            return channel;
        }
        const connnection = await amqplib.connect(MESSAGE_BROKER_URL);
        channel = await connnection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
        return channel;
    } catch (error) {
        console.error('Error creating channel:', error);
        throw error;
    }
}

const publishMessage = async (message,bindingkey) => {
    try {
        if(!channel) {
            channel = await createChannel();
        }
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.publish(EXCHANGE_NAME, bindingkey, Buffer.from(JSON.stringify(message)));
        console.log('Message published:', message);
    } catch (error) {
        console.error('Error publishing message:', error);
        throw error;
    }
}

const subscribeToQueue = async (callback,bindingkey) => {
    try {
        if(!channel) {
            await createChannel();
        }
        const appQueue=await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.bindQueue(appQueue.queue, EXCHANGE_NAME,bindingkey);
        await channel.consume(appQueue.queue, async (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                await callback(message);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.log('Error subscribing to queue:', error);
        throw error;
    }
}

module.exports = {
    createChannel,
    publishMessage,
    subscribeToQueue
}