import { Client } from 'redis-om'

// Connect Redis
const url = process.env.REDIS_URL
const client = await new Client().open(url)

export default client;



