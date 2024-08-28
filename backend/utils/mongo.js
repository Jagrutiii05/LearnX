import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongoDB")
    }
    catch{
        console.log(error);
    }
}

export default connectDB;