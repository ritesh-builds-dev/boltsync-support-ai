import {connect} from "mongoose"

// check mongoDb is working or not
const mongo_url = process.env.MONGODB_URL 
if (!mongo_url) {
  console.error("MONGODB_URL is not defined in environment variables");
}

// connectDB: Checks for an active connection to reuse it; if none exists, it starts a new one safely.
let cache =(global as any).mongoose
    if (!cache) {
        cache = global.mongoose = { conn: null, promise: null }
    }
   const connectDB =async () => {
        if (cache.conn) {
            return cache.conn
        } 
        if (!cache.promise) {
           cache.promise = connect(mongo_url!).then((c) => c.connection)
        }

        try {
            const conn= await cache.promise
            
        } catch (error) {
            console.log(error)
        }
        return cache.conn
    }

        export default connectDB