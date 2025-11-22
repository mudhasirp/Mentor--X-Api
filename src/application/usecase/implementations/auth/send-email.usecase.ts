import { inject, injectable } from "tsyringe";
import { IOtpService } from "../../../services/interfaces/otp.service.interface";
import { IAuthRepository } from "../../../../domain/repositoryInterface/authRepository.interface";
import { CustomError } from "../../../../domain/errors/customErrors";
import {
  EmailOtpPurpose,
  ERROR_MESSAGE,
  EVENT_EMMITER_TYPE,
  HTTP_STATUS,
  MAIL_CONTENT_PURPOSE
} from "../../../../shared/constants";
import { eventBus } from "../../../../shared/eventBus";
import { mailContentProvider } from "../../../../shared/mailContentProvider";
import { ISendEmailUsecase } from "../../interface/auth/send-email.usecase";
import { UserRegisterDTO } from "../../../dto/request/auth.dto";

@injectable()
export class SendEmailUsecase implements ISendEmailUsecase {
  constructor(
    @inject("IOtpService")
    private otpService: IOtpService,

    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async execute(formDto: UserRegisterDTO, purpose: EmailOtpPurpose): Promise<void> {
    const email = formDto.email;
    const username=formDto.username
    console.log("sending gmail")

    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGE.USER_ALREADY_EXISTS);
    }
     const existingUsername = await this.authRepository.findByUsername(username);
     
  if (existingUsername) {
    console.log("existing user")
    throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGE.USER_ALREADY_EXISTS);
  }


    await this.otpService.deleteOtp(email);
    await this.otpService.deleteFormData(email);

    const otp = this.otpService.generateOtp();
    await this.otpService.storeOtp(email, otp);

    if (purpose === "signup") {
      await this.otpService.storeFormData(email, {
        username: formDto.username,
        email: formDto.email,
        password: formDto.password,
        confirm: formDto.confirm,
      
      });
    }

    const html = mailContentProvider(MAIL_CONTENT_PURPOSE.OTP, otp);

    eventBus.emit(
      EVENT_EMMITER_TYPE.SENDMAIL,
      email,
      purpose === "signup" ? "Account Creation" : "Email Verification",
      html
    );
  }
}
