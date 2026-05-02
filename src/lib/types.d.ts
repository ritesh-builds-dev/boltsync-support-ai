// Defines the global structure for Mongoose to reuse connections and fix TypeScript errors.
import { Connection } from "mongoose"

declare global {    
    var mongoose:{
        conn:Connection|null,
        promise:Promise<Connection>|null
    }
}
export {}