import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const appointmentSchema = new Schema({
    idApp: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for User */
export const appointmentRepository = mongoose.model('appointments', appointmentSchema)