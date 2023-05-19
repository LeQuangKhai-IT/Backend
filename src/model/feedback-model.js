import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const feedbackSchema = new Schema({
    idFb: {
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
        trim: true
    },
    descript: {
        type: String,
    },
})

/* use the client to create a Repository just for Service */
export const feedbackRepository = mongoose.model('feedbacks', feedbackSchema)