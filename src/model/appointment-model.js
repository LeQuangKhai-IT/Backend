import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const serviceSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for User */
export const userRepository = mongoose.model('services', serviceSchema)