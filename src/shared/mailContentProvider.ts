import { MAIL_CONTENT_PURPOSE } from "./constants";

export function mailContentProvider(purpose: string, data: string): string {
  const { OTP } = MAIL_CONTENT_PURPOSE;

  switch (purpose) {
    case OTP:
      return `
      <div style="max-width: 550px; margin: auto; font-family: 'Poppins', Arial, sans-serif; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2a2a72, #009ffd); padding: 24px; color: white; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 0.5px;">Mentor X</h2>
          <p style="margin: 8px 0 0; font-size: 14px;">Your trusted eLearning partner</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hi there 👋,</p>
          <p style="font-size: 15px; color: #555;">Use the OTP below to verify your account or continue your secure action:</p>
          
          <div style="text-align: center; margin: 24px 0;">
            <span style="display: inline-block; font-size: 26px; background-color: #009ffd; color: #fff; padding: 14px 30px; border-radius: 10px; font-weight: bold; letter-spacing: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);">
              ${data}
            </span>
          </div>

          <p style="font-size: 14px; color: #888;">⚠️ This OTP is valid for <strong>1 minute</strong>. Do not share it with anyone for your account safety.</p>

          <p style="font-size: 13px; color: #aaa; margin-top: 40px; text-align: center;">
            Thanks for being with us ❤️<br/>
            — The Mentor X Team 🛒
          </p>
        </div>
      </div>
      `;
    default:
      return "";
  }
}
