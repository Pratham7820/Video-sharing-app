import mongoose from "mongoose"

const url = process.env.MONGODB_URL!

if(!url){
    throw new Error("Please define your mongodb urls")
}

let cached = global.mongoose

if(!cached){
   cached = global.mongoose = {conn : null,promise:null}
}

export async function connectToDB() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        mongoose.connect(url).then(
            ()=>(mongoose.connection)
        )
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        throw error
        cached.promise = null
    }
    return cached.conn
}
