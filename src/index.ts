import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { App } from "./infrastructure/config/server/server.config";
import { MongoConnect } from "./infrastructure/config/database/mongoConnect.config";
import { config } from "./shared/config";

try{
    console.log("App class:", App);

  console.log("server starts")

  const app= new App();
  const mongoConnect =new MongoConnect();
  mongoConnect
  .connectDb()
  .then(()=>console.log("mongodb connected"))
  .catch((error)=>console.log(error))
  app
  .getApp()
  .listen(config.server.PORT,()=>{
    console.log(`server running at port ${config.server.PORT}`)
  }
     
  )
}
catch(error)
{
  console.log(error)
}
