import { inject,injectable } from "tsyringe";

import { ValidationError } from "../../../../domain/errors/validationError";
import { IOtpService } from "../../../services/interfaces/otp.service.interface";

import { HTTP_STATUS,ERROR_MESSAGE, SUCESS_MESSAGE} from "../../../../shared/constants";
import { ISuccessResponseHandler,successResponseHandler } from "../../../../shared/utils/sucessResponeHandler";
import { IVerifyOtpUsecase } from "../../interface/auth/verifyOtpUsecase";

@injectable()
export class verifyOtpUsecase implements IVerifyOtpUsecase{
    constructor(
        @inject("IOtpService")
        private _IOtpService:IOtpService
    ){}
    async execute(email: string, otp: string): Promise<ISuccessResponseHandler> {
        const isOtpValid=await this._IOtpService.verifyOtp({email,otp});

        if(!isOtpValid){
            throw new ValidationError(ERROR_MESSAGE.INVALID_OTP)
        }
        
        return successResponseHandler(
            true,
            HTTP_STATUS.OK,
            SUCESS_MESSAGE.OTP_VERIFIED
        )
    }
    
}