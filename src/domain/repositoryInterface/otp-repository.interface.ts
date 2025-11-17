export interface IOTPRepository {
  saveOtp(email: string, otp: string): Promise<void>;

  getOtp(
    email: string
  ): Promise<{ otp: string; email: string; createdAt: number } | null>;

  deleteOtp(email: string): Promise<void>;

  storeFormData(email: string, data: Record<string, any>): Promise<void>;

  getFormData(email: string): Promise<Record<string, any> | null>;

  deleteFormData(email: string): Promise<void>;
}
