import 'dotenv/config.js'
import mongoose from 'mongoose';

const url = process.env.REDIS_URL;

mongoose.set('strictQuery', true);
export const connectDB = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/BaotriDB')
        console.log("MongoDB connected!")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}



