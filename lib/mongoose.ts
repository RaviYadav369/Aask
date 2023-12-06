import mongoose from 'mongoose'

let isConnected:boolean = false;

export const connectToDb = async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI){
        return console.log('MONGODB_URI not found');
        
    }
    if(isConnected){
        return console.log('Already connected to db');
        
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'Aask'
        })
        isConnected=true;
        console.log('Connected to db');
        
    } catch (error) {
        console.log('Error connecting to db',error);
        
    }
}