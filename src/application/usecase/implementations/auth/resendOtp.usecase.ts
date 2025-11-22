import { inject,injectable } from "tsyringe";
import { IResendOtpUsecase } from "../../interface/auth/resendOtp.interface";
import { IOtpService } from "../../../services/interfaces/otp.service.interface";
import { ValidationError } from "../../../../domain/errors/validationError";
import { 
    ERROR_MESSAGE,
    EVENT_EMMITER_TYPE,
    MAIL_CONTENT_PURPOSE,
    HTTP_STATUS
 } from "../../../../shared/constants";
 import { eventBus } from "../../../../shared/eventBus";
 import { mailContentProvider } from "../../../../shared/mailContentProvider";
 import { ISuccessResponseHandler, successResponseHandler } from "../../../../shared/utils/sucessResponeHandler";

 @injectable()
 export class ResendOtpUsecase implements IResendOtpUsecase{
    constructor(
        @inject("IOtpService")
        private otpService:IOtpService
    ){}
    async execute(email: string): Promise<ISuccessResponseHandler> {
        if(!email){
            throw new ValidationError(ERROR_MESSAGE.EMAIL_REQUIRED)
        }
        await this.otpService.deleteOtp(email)
        const otp=this.otpService.generateOtp();
        console.log("Resent Otp",otp)
        await this.otpService.storeOtp(email,otp)
        eventBus.emit(  
            EVENT_EMMITER_TYPE.SENDMAIL,
            email,
            "Resend Otp",
            mailContentProvider(MAIL_CONTENT_PURPOSE.RESEND_OTP,otp)
        )
        return successResponseHandler(true,HTTP_STATUS.OK,"otp resent")
    }
 }