import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const serviceSchema = new Schema({
    idSer: {
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
    descript: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for Service */
export const serviceRepository = mongoose.model('services', serviceSchema)