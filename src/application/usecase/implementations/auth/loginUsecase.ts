import { inject,injectable } from "tsyringe";

import bcrypt from "bcrypt"

import { IAuthRepository } from "../../../../domain/repositoryInterface/authRepository.interface";

import { CustomError } from "../../../../domain/errors/customErrors";

import { ILoginUsecase } from "../../interface/auth/loginUsecase";

import { LoginDTO } from "../../../dto/request/login.dto";
import { IUserEntity } from "../../../../domain/entities/userModel";

@injectable()
export class LoginUsecase implements ILoginUsecase{
    constructor(
        @inject("AuthRepository")
        private authRepositoy:IAuthRepository
    ){}
    async execute(data: LoginDTO): Promise<IUserEntity> {
        console.log("🔍 Checking DB for email:", data.email);

  const user = await this.authRepositoy.findByEmail(data.email);
  console.log("📌 User fetched from DB:", user);

  if (!user) {
    console.log("❌ No user found with that email");
    throw new CustomError(400, "Invalid email or password");
  }

  console.log("🔍 Comparing password");
  const isMatch = await bcrypt.compare(data.password, user.password);
  console.log("🔍 Password Match:", isMatch);

  if (!isMatch) {
    console.log("❌ Password incorrect");
    throw new CustomError(400, "Invalid email or password");
  }

  console.log("✅ Login Success");
  return user;
    }
}