import mongoose from 'mongoose'

export const mongoConnect = async ()=>{
    try{
        const MONGO_URI = process.env.MONGO_URI
        if(MONGO_URI){

            await mongoose.connect(MONGO_URI)
            console.log(`connected to ${mongoose.connection.host}`)
        }
    }catch(err){
        const error: Error = err as Error;
        console.log(`Error is ${error.message}`);
    }
}