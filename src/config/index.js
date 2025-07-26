const dotenv =require('dotenv');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    FLIGHT_SERVICE_PATH:process.env.FLIGHT_SERVICE_PATH,
    MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
    QUEUE_NAME:process.env.QUEUE_NAME,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    AUTH_SERVICE_PATH:process.env.AUTH_SERVICE_PATH
}