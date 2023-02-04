import { Entity, Schema } from 'redis-om'
import client from '../config/init.redis.js'

/* our entity */
class Admin extends Entity { }

/* create a Schema for Admin */
const adminSchema = new Schema(Admin, {
    id: { type: 'string' },
    email: { type: 'string' },
    passWord: { type: 'string' },
    fullName: { type: 'string' },
    address: { type: 'string' },
    phoneNumber: { type: 'boolean' },
    gender: { type: 'boolean' },
    roleId: { type: 'string' },
})

/* use the client to create a Repository just for Admins */
export const adminRepository = client.fetchRepository(adminSchema)

/* create the index for Admin */
await adminRepository.createIndex()