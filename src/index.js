// import mongoose, { Error, mongo } from "mongoose";
// import { DB_NAME } from "./constant.js";
import connectDB from "./db/index.js";
import {app} from "./app.js"
import dotenv from "dotenv"
import { Apierror } from "./utils/Apierror.js";
dotenv.config({path:'./env'})




connectDB()
.then(() => {
    app.listen(process.env.PORT,()=>{
        console.log(`port is listening on ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})


























// (async()=>{
// try {
//     await mongoose.connect( `${process.env.MONGODB_URI}/${DB_NAME}`)

//     app.on("error",(error)=>{
//         console.log("Error is: ",error);
//         throw error
        
//     })

//     app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on PORT :${process.env.PORT}`);
        
//     })
    
// } catch (error) {
//     console.log("error is :",error);
// }
// })()