import { container } from "tsyringe";
import { RegisterUserUsecase } from "../../application/usecase/implementations/auth/registerUser.useCase";
import { IRegisterUserUseCase } from "../../application/usecase/interface/auth/registerUsecase.interface";
import { IVerifyOtpUsecase } from "../../application/usecase/interface/auth/verifyOtpUsecase";
import { verifyOtpUsecase } from "../../application/usecase/implementations/auth/verifyUser.usecase";
import { ISendEmailUsecase } from "../../application/usecase/interface/auth/send-email.usecase";
import { SendEmailUsecase } from "../../application/usecase/implementations/auth/send-email.usecase";
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
    }
    
    )
  }
}