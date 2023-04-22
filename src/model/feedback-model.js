import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const feedBackSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for User */
export const userRepository = mongoose.model('feedback', feedBackSchema)