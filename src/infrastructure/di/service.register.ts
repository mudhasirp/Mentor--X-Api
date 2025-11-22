import { container } from "tsyringe";
import { IOtpService } from "../../application/services/interfaces/otp.service.interface";
import { OtpService } from "../../application/services/implementations/otp.service";
import { IEmailService } from "../../domain/service-interfaces/email-service.interface";
import { EmailService } from "../service/email.service";
import { ITokenService } from "../../domain/service-interfaces/token-service.interface";
import { TokenService } from "../service/token.service";

export class ServiceRegistry{
    static registerService():void{
        container.register<IOtpService>("IOtpService",{
            useClass:OtpService
        });
        container.register<IEmailService>("IEmailService",{
            useClass:EmailService
        })
        container.register<ITokenService>("ITokenService",{
            useClass:TokenService
        })
    }
}