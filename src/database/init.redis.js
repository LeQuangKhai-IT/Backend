import Redis from 'ioredis'

const client = async () => {
    // Connect to Redis at 127.0.0.1, port 6379.
    const redisClient = new Redis({
        url: process.env.REDIS_URI
    });

    redisClient.on('connect', () => {
        console.log('Redis client connected !');
    });

    redisClient.on("error", (error) => {
        console.error(error);
    });


};


module.exports = client;

