import { Client } from 'redis-om'
import 'dotenv/config.js'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

/* create and open the Redis OM Client */
const client = await new Client().open(url)
const value = await client.execute(['json.get', 'Person:01GR9NEC0CP6YVHS7V0PEDRDP7'])
console.log(value)

export default client;
