import { Entity, Schema } from 'redis-om'
import client from '../config/init.redis.js'

/* our entity */
class User extends Entity { }

/* create a Schema for User */
const userSchema = new Schema(User, {
    email: { type: 'string' },
    passWord: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    address: { type: 'string' },
    gender: { type: 'boolean' },
    image: { type: 'string' },
    roleId: { type: 'string' },
    phoneNumber: { type: 'string' },
    positionId: { type: 'string' }
},
    {
        dataStructure: "JSON"
    })

/* use the client to create a Repository just for User */
export const userRepository = client.fetchRepository(userSchema)

/* create the index for Person */
await userRepository.createIndex()





