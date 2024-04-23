import mongoose from 'mongoose';
const MongoDbURI =  process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
const cached = (global as any).mongoose || {conn:null, promise:null}    // storing the used connection so we don't have to connect to the database every time we make a request
 const connectToDatabase = async()=>{
    if(cached.conn){
        return cached.conn
    }
    if(!MongoDbURI){
        throw new Error('MONGODB_URI is not defined')
    }
    cached.promise = cached.promise || mongoose.connect(MongoDbURI,{
        'dbName':'WhipEvents',
        bufferCommands:false,
    })
    cached.conn = await cached.promise
    return cached.conn
 }