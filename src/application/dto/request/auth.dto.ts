import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";
import { ValidationError } from "../../../domain/errors/validationError";

export class UserRegisterDTO {
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]{3,20}$/, {
    message: "Username must be 3-20 chars, letters, numbers or underscores",
  })
  username!: string;

  @IsEmail({}, { message: "Email must be valid" })
  email!: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Password must be at least 8 characters long and contain at least one letter and one number",
  })
  password!: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  confirm!: string; 

  validatePasswordMatch() {
    if (this.password !== this.confirm) {
      throw new ValidationError("Passwords do not match");
    }
  }
}
