import { container } from "tsyringe";
import { AuthController } from "../../presentation/controller/auth/auth.controller";
import { IAuthController } from "../../presentation/interface/authController.interface";
import { DependecyInjection } from ".";
import { AuthRoutes } from "../../presentation/route/auth/auth";
import { EmailService } from "../service/email.service";
DependecyInjection.registerAll()
export const authController = container.resolve<IAuthController>(AuthController)
export const emailService=container.resolve(EmailService)

export const authRoutes=container.resolve(AuthRoutes)
