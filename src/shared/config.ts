import dotenv from "dotenv"
dotenv.config()

export const config={
    server:{
        PORT:process.env.PORT || 2500,
    },
    database:{
        URI: process.env.MONGODB_URI ||  "mongodb://127.0.0.1:27017/mydb"
    },
    client:{
        URI:process.env.CLIENT_URI
    },
    redis:{
        URL:process.env.REDIS_URI
    },
    email:{
        host:process.env.EMAIL_HOST,
        port:Number(process.env.EMAIL_PORT),
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
   jwt: {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || "",
    ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || "15m",

    REFRESH_SECRET: process.env.REFRESH_SECRET_KEY || "",
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || "7d"
}

}