import { NextFunction,Request,Response,Router } from "express";
import { authController } from "../../../infrastructure/di/resolve";
import { BaseRoute } from "../base.route";
import { injectable } from "tsyringe";
import { asyncHandler } from "../../../shared/async-handler";
@injectable()
export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
    console.log("AuthRoutes initialized");  
  }

  protected initializeRoutes(): void {
    console.log("AuthRoutes routes initialized"); 
    this.router.post(
      "/send-otp",
      asyncHandler(authController.sendOtp.bind(authController))
    );
    this.router.post(
      "/verify-otp",
      asyncHandler(authController.verifyOtp.bind(authController))
    )
    this.router.post(
      "/signup",
      asyncHandler(authController.signup.bind(authController))
    )
    this.router.post(
      "/resend-otp",
      asyncHandler(authController.resendOtp.bind(authController))
    )
    this.router.post(
      "/login",
      asyncHandler(authController.login.bind(authController))
    )
  }
}

