import { Client } from 'redis-om'
import 'dotenv/config.js'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

/* create and open the Redis OM Client */
const client = await new Client().open(url).catch(
    console.log('Redis database connected!')
)

export default client;

/*{
"email":"John Doe@gmail",

"passWord":"password",

"firstName":"John",

"lastName":"Doe",

"address":"John Doe",

"gender":true,

"image":"anh1",

"roleId":"staff",

"phoneNumber":"0123456",

"positionId":"banhang"
}*/