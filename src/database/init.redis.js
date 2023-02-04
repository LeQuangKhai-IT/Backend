import { createClient } from 'redis'
import { Client } from 'redis-om'

const url = process.env.REDIS_URL

const connection = async () => {
    const redis = createClient({ url })
    redis.connect()

    const client = await new Client().use(redis)

    const value = await client.execute(['GET', 'test'])
    console.log(value)
}


module.exports = connection;