import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        mongoose.set("strictQuery", false);
        const db = await mongoose.connect(process.env.MONGO_URI)
       
        console.log(`MongoDB connected`)

       

    }catch(error){
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB