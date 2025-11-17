import { IUserEntity } from "../../../domain/entities/userModel";

export interface IOtpService{
    generateOtp():string;
    deleteOtp(email:string):Promise<void>
    storeOtp(email:string,otp:string):Promise<void>;
    verifyOtp({email,otp}:{email:string,otp:string}):Promise<boolean>
      storeFormData(email: string, formData: Record<string, any>): Promise<void>;

    getFormData(email:string):Promise<Record<string,any>| null>;
    deleteFormData(email:string):Promise<void>
}