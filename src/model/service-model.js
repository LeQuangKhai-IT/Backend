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
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    fee: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for User */
export const serviceRepository = mongoose.model('services', serviceSchema)