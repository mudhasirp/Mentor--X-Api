import { EmailOtpPurpose } from "../../../../shared/constants";
export interface ISendEmailUsecase {
  execute(
    formData: Record<string, any>,
    purpose: EmailOtpPurpose
  ): Promise<void>;
}
