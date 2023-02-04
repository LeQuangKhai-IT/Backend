import { Entity, Schema } from 'redis-om'
import client from '../config/init.redis.js'

/* our entity */
class Staff extends Entity { }

/* create a Schema for Staff */
const staffSchema = new Schema(Staff, {
    id: { type: 'string' },
    email: { type: 'string' },
    passWord: { type: 'string' },
    fullName: { type: 'string' },
    address: { type: 'string' },
    phoneNumber: { type: 'string' },
    gender: { type: 'boolean' },
    roleId: { type: 'string' },
},
    {
        dataStructure: "JSON"
    })

/* use the client to create a Repository just for Persons */
export const staffRepository = client.fetchRepository(staffSchema)


await staffRepository.createIndex()




