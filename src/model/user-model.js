import mongoose from 'mongoose'
const { Schema } = mongoose;

/* create a Schema for User */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passWord: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    gender: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    position: {
        type: String,
        required: true,
    },

})

/* use the client to create a Repository just for User */
export const userRepository = mongoose.model('users', userSchema)




