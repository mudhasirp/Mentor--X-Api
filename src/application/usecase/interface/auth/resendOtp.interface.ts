import { ISuccessResponseHandler } from "../../../../shared/utils/sucessResponeHandler";

export interface IResendOtpUsecase{
    execute(email:string):Promise<ISuccessResponseHandler>
}