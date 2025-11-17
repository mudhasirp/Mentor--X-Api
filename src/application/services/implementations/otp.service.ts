import { inject, injectable } from "tsyringe";
import { IOTPRepository } from "../../../domain/repositoryInterface/otp-repository.interface";
import { IOtpService } from "../interfaces/otp.service.interface";

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject("IOTPRepository")
    private otpRepository: IOTPRepository
  ) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async storeOtp(email: string, otp: string): Promise<void> {
        console.log("Generated OTP for", email, "=", otp);  // 👈 ADD THIS

    await this.otpRepository.saveOtp(email, otp);
  }

  async verifyOtp({ email, otp }: { email: string; otp: string }): Promise<boolean> {
    const stored = await this.otpRepository.getOtp(email);
    if (!stored) return false;

    const now = Date.now();
    const age = now - stored.createdAt;

    // OTP validation window (1 min)
    if (age > 60 * 1000) return false;

    return stored.otp === otp;
  }

  async deleteOtp(email: string): Promise<void> {
    await this.otpRepository.deleteOtp(email);
  }

  async storeFormData(email: string, formData: Record<string, any>): Promise<void> {
    await this.otpRepository.storeFormData(email, formData);
  }

  async getFormData(email: string): Promise<Record<string, any> | null> {
    return await this.otpRepository.getFormData(email);
  }

  async deleteFormData(email: string): Promise<void> {
    await this.otpRepository.deleteFormData(email);
  }
}
