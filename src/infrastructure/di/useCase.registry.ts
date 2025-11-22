import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../application/usecase/implementations/auth/registerUser.useCase";
import { IRegisterUserUseCase } from "../../application/usecase/interface/auth/registerUsecase.interface";
import { IVerifyOtpUsecase } from "../../application/usecase/interface/auth/verifyOtpUsecase";
import { verifyOtpUsecase } from "../../application/usecase/implementations/auth/verifyUser.usecase";
import { ISendEmailUsecase } from "../../application/usecase/interface/auth/send-email.usecase";
import { SendEmailUsecase } from "../../application/usecase/implementations/auth/send-email.usecase";
import { IResendOtpUsecase } from "../../application/usecase/interface/auth/resendOtp.interface";
import { ResendOtpUsecase } from "../../application/usecase/implementations/auth/resendOtp.usecase";
import { ILoginUsecase } from "../../application/usecase/interface/auth/loginUsecase";
import { LoginUsecase } from "../../application/usecase/implementations/auth/loginUsecase";
import { IGenerateTokenUseCase } from "../../application/usecase/interface/auth/generateToken.usecase";
import { GenerateTokenUsecase } from "../../application/usecase/implementations/auth/generateToken.Usecase";
export class UseCaseRegistry{
  static registerUsecases():void{
    container.register<IRegisterUserUseCase>("RegisterUserUsecase",{
        useClass:RegisterUserUsecase
    }),
    container.register<IVerifyOtpUsecase>("IVerifyOtpUsecase",{
      useClass:verifyOtpUsecase
    }),
    container.register<ISendEmailUsecase>("ISendEmailUsecase",{
      useClass:SendEmailUsecase
    }),
    container.register<IResendOtpUsecase>("IResendOtpUsecase",{
      useClass:ResendOtpUsecase
    }),
  container.register<ILoginUsecase>("ILoginUsecase",{
    useClass:LoginUsecase
  }),
container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{
  useClass:GenerateTokenUsecase
})}
    

}