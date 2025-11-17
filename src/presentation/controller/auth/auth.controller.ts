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
    private otpService: IOtpService
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

    // 🔥 HANDLE DUPLICATE KEY ERRORS SAFELY
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      ResponseHelper.error(
        res,
        `${field} already exists`,
        HTTP_STATUS.CONFLICT
      );
    }

    // Generic fallback
    ResponseHelper.error(
      res,
      "Signup failed. Please try again later.",
      HTTP_STATUS.BAD_REQUEST
    );
    }
  }
}
