import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const blogSchema = new Schema({
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
    author: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

/* use the client to create a Repository just for User */
export const userRepository = mongoose.model('blogs', blogSchema)