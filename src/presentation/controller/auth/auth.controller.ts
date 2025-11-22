import { inject, injectable } from "tsyringe";
import { IAuthController } from "../../interface/authController.interface";
import { Request, Response } from "express";

import { IRegisterUserUseCase } from "../../../application/usecase/interface/auth/registerUsecase.interface";
import { ISendEmailUsecase } from "../../../application/usecase/interface/auth/send-email.usecase";
import { IVerifyOtpUsecase } from "../../../application/usecase/interface/auth/verifyOtpUsecase";
import { IOtpService } from "../../../application/services/interfaces/otp.service.interface";

import { ResponseHelper } from "../../../infrastructure/config/server/helpers/response.helper";
import { ERROR_MESSAGE, HTTP_STATUS, SUCESS_MESSAGE } from "../../../shared/constants";
import { UserRegisterDTO } from "../../../application/dto/request/auth.dto";
import { validate } from "class-validator";
import { IResendOtpUsecase } from "../../../application/usecase/interface/auth/resendOtp.interface";
import { LoginDTO } from "../../../application/dto/request/login.dto";
import { ILoginUsecase } from "../../../application/usecase/interface/auth/loginUsecase";
import { IGenerateTokenUseCase } from "../../../application/usecase/interface/auth/generateToken.usecase";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("RegisterUserUsecase")
    private registerUserUsecase: IRegisterUserUseCase,

    @inject("ISendEmailUsecase")
    private sendEmailUsecase: ISendEmailUsecase,

    @inject("IVerifyOtpUsecase")
    private verifyOtpUsecase: IVerifyOtpUsecase,

    @inject("IOtpService")
    private otpService: IOtpService,

    @inject("IResendOtpUsecase")
    private resendOtpUsecase:IResendOtpUsecase,

    @inject("ILoginUsecase")
    private _loginUsecase:ILoginUsecase,

    @inject("IGenerateTokenUseCase")
    private _generateUseCase :IGenerateTokenUseCase
  ) {}

  // --------------------------------------------------
  // 1) SEND OTP
  // --------------------------------------------------
async sendOtp(req: Request, res: Response): Promise<void> {
  try {
    const dto = Object.assign(new UserRegisterDTO(), req.body);
    console.log("sending the otp")
    const errors = await validate(dto);
    if (errors.length > 0) {
      ResponseHelper.error(
        res,
        Object.values(errors[0].constraints!)[0],
        HTTP_STATUS.BAD_REQUEST
      );
      return;
    }

    dto.validatePasswordMatch();

    await this.sendEmailUsecase.execute(req.body, "signup");
  
    ResponseHelper.success(
      res,
      HTTP_STATUS.OK,
      SUCESS_MESSAGE.OTP_SEND_SUCCESS
    );
  } catch (error: any) {
    console.error("Send OTP Error:", error);

    ResponseHelper.error(
      res,
      error.message || "Failed to send OTP",
      HTTP_STATUS.BAD_REQUEST
    );
  }
}




  // --------------------------------------------------
  // 2) VERIFY OTP
  // --------------------------------------------------
  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      const result = await this.verifyOtpUsecase.execute(email, otp);

      ResponseHelper.success(res, result.statusCode, result.content.message);
    } catch (error: any) {
      console.error("Verify OTP Error:", error);
      ResponseHelper.error(
        res,
        error.message || "OTP verification failed",
        HTTP_STATUS.BAD_REQUEST
      );
    }
  }

  // --------------------------------------------------
  // 3) FINAL SIGNUP
  // --------------------------------------------------
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const formData = await this.otpService.getFormData(email)
      if(!formData){
        ResponseHelper.error(
          res,
          "Signup session expired . Please register again.",
          HTTP_STATUS.BAD_REQUEST
        )
        return
      }
      const result = await this.registerUserUsecase.execute(email);

       await this.otpService.deleteFormData(email)
       await this.otpService.deleteOtp(email)

      ResponseHelper.success(
        res,
        result.statusCode,
        result.content.message || SUCESS_MESSAGE.REGISTER_SUCCESS,
        result.content.data
      );
    } catch (error: any) {
       console.error("Signup Error:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      ResponseHelper.error(
        res,
        `${field} already exists`,
        HTTP_STATUS.CONFLICT
      );
    }

    ResponseHelper.error(
      res,
      "Signup failed. Please try again later.",
      HTTP_STATUS.BAD_REQUEST
    );
    }
  }
  async resendOtp(req: Request, res: Response): Promise<void> {
    try{
      const {email}=req.body;
       await this.resendOtpUsecase.execute(email)
      ResponseHelper.success(
        res,
        HTTP_STATUS.OK,
        "Otp resent successfully"
        
      )
    }catch(error:any){
   console.error("Resend OTp Error",error),
   ResponseHelper.error(
    res,
    error.message || "failed to resend Otp",
   400 
   )
  }
  }
  async login(req: Request, res: Response): Promise<void> {
  try {
    console.log("📥 LOGIN REQUEST BODY:", req.body);

    // 1. Validate DTO
    const dto = Object.assign(new LoginDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints!)[0];
      console.log("❌ DTO VALIDATION FAILED:", msg);
       ResponseHelper.error(res, msg, HTTP_STATUS.BAD_REQUEST);
    }

    console.log("✅ DTO VALIDATION PASSED");

    // 2. Execute login usecase
    console.log("🔍 Checking user in DB for email:", dto.email);
    const user = await this._loginUsecase.execute(dto);

    console.log("✅ USER FOUND:", {
      id: user?._id,
      email: user?.email,
      role: user?.role,
      username: user?.username,
    });

    // 3. Generate tokens
    console.log("🔐 Generating tokens...");
    const tokens = await this._generateUseCase.execute(
      user._id.toString(),
      user.email,
      user.role
    );

    console.log("✅ TOKENS GENERATED:", {
      accessToken: tokens.accessToken.slice(0, 15) + "...",
      refreshToken: tokens.refreshToken.slice(0, 15) + "...",
    });

    // 4. Set cookies
    console.log("🍪 Setting Auth Cookies...");
    setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
      "access_token",
      "refresh_token"
    );

    // 5. Final response
    console.log("🎉 LOGIN SUCCESS");

    ResponseHelper.success(res, HTTP_STATUS.OK, "Login successful", {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    });

  } catch (err: any) {
    console.log("🔥 LOGIN ERROR OCCURRED");
    console.error("🔥 ERROR:", err);

    ResponseHelper.error(
      res,
      err.message || "Login failed",
      HTTP_STATUS.BAD_REQUEST
    );
  }
}

}
