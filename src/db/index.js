import mongoose, { Error, mongo } from "mongoose";
import DB_NAME from "../constant.js"; 


const connectDB=async()=>{
try {
    const connectioninstance=await mongoose.connect( `${process.env.MONGODB_URI}/${DB_NAME}`)

    console.log(`mongodb connected !! DB host ${connectioninstance.connection.host}`)
    
} catch (error) {
    console.log("error is :",error);
    process.exit(1);
}
}

export default connectDB