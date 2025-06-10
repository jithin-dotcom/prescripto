
import mongoose from "mongoose"
import env from "./env.config";

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log('connected to MongoDB');
    } catch (error) {
            console.error('error connecting :',error);
            process.exit(1);
        
    }
}

export default connectDB;