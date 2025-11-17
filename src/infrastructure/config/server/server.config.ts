import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express"
import { config } from "../../../shared/config";
import { AuthRoutes } from "../../../presentation/route/auth/auth";
import { authController, authRoutes } from "../../di/resolve";
export class App {
    private _app: Application;
   constructor() {
  console.log("✅ App constructor called");

  this._app = express();

  console.log("✅ Configuring middleware...");
  this.configureMiddleware();

  console.log("✅ Configuring routes...");
  this.configureRoutes();

  console.log("✅ Routes configured!");
}
    private configureMiddleware(): void {
        this._app.use(
            cors({
                origin: config.client.URI,
                credentials: true
            })
        )
        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(cookieParser())
    }
    private configureRoutes(): void {
        this._app.get("/test", (req, res) => {
            console.log("✅ /test hit!");
            res.send("Test route working");
        });

        this._app.use("/auth", authRoutes.router)
        console.log("Mounting authRoutes.router:", authRoutes.router.stack); // ✅ Check router has routes

    }
    public getApp(): Application {
        return this._app
    }
    
}


