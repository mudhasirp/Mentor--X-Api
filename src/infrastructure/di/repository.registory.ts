import { container } from "tsyringe";

import { IAuthRepository } from "../../domain/repositoryInterface/authRepository.interface";
import { AuthRepository } from "../repository/authRepository";
import { IOTPRepository } from "../../domain/repositoryInterface/otp-repository.interface";
import { OTPRepositoy } from "../repository/otpRepository";
export class RepositoryRegistry{
    static registerRepositories():void{
        container.register<IAuthRepository>("AuthRepository",{
            useClass:AuthRepository
        })
        container.register<IOTPRepository>("IOTPRepository",{
            useClass:OTPRepositoy
        })
    }
}