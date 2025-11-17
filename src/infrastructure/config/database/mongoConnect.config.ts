import mongoose from "mongoose"

import { config } from "../../../shared/config"
import { error } from "console";

export class MongoConnect{
    private _dburl : string;
    constructor()
    {
        this._dburl=config.database.URI
    }
    async connectDb()
    {
        try{
            await mongoose.connect(this._dburl);
            console.log("db connected successfully")
            console.log("Connecting to MongoDB at:", this._dburl)
            mongoose.connection.on("error",(error)=>{
                console.log('mongo db connection error',error)
            })
            mongoose.connection.on('disconnected',()=>{
                console.log('Mongo db disconnected')
            })
        }
        catch(error)
        {
            console.log("failed to connect mongo db",error)
        }
    }
}