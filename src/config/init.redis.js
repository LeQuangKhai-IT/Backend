import 'dotenv/config.js'

import { Client } from "redis-om";
const url = process.env.REDIS_URL;
let client;
try {
    client = await new Client().open(url);
    console.log("Redis database connected!");
} catch (err) {
    console.log(`Redis error: ${err}`.red.bold);
}
export default client;

