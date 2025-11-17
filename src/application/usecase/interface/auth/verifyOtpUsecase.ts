import { ISuccessResponseHandler } from "../../../../shared/utils/sucessResponeHandler";

export interface IVerifyOtpUsecase{
    execute(email : string, otp:string):Promise<ISuccessResponseHandler>;
}