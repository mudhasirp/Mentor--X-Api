import bcrypt from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../interface/auth/registerUsecase.interface";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "../../../../shared/constants";
import { UserRegisterDTO } from "../../../dto/request/auth.dto";
import { IAuthRepository } from "../../../../domain/repositoryInterface/authRepository.interface";
import { ISuccessResponseHandler, successResponseHandler } from "../../../../shared/utils/sucessResponeHandler";
import { CustomError } from "../../../../domain/errors/customErrors";
import { IOtpService } from "../../../services/interfaces/otp.service.interface";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUseCase {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository,

    @inject("IOtpService")
    private otpService: IOtpService
  ) {}

  async execute(email: string): Promise<ISuccessResponseHandler> {
    // 1. Get stored signup data
    const storedForm = await this.otpService.getFormData(email);
    if (!storedForm) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGE.RESTART_SIGNUP
      );
    }

    // 2. Convert stored form back to DTO
    const dto = Object.assign(new UserRegisterDTO(), storedForm);

    // 3. Validate password match again (safety)
    dto.validatePasswordMatch();

    // 4. Check user existence
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        ERROR_MESSAGE.USER_ALREADY_EXISTS
      );
    }

    // 5. Hash password
    const hashPassword = await bcrypt.hash(dto.password, 10);

    // 6. Create final user object
    const newUser = await this.authRepository.save({
      email: dto.email,
      username: dto.username,
      password: hashPassword,
 
      createdAt: new Date(),
      role: ROLES.STUDENT // or dynamic
    });

    // 7. Cleanup Redis
    await this.otpService.deleteOtp(email);
    await this.otpService.deleteFormData(email);

    // 8. Remove password before returning
    const { password, ...safeUser } = newUser as any;

    // 9. Return success response
    return successResponseHandler(
      true,
      HTTP_STATUS.CREATED,
      "User registered successfully",
      safeUser
    );
  }
}
