export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  STUDENT = "student",
  MENTOR = "mentor"
}


export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  UNPROCESSED_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}
export enum EVENT_EMMITER_TYPE{
  SENDMAIL="sendmail"
}


export enum MAIL_CONTENT_PURPOSE {
  OTP = "otp",
  EMAIL_CHANGE = "email change",
  REQUEST_REJECTED = "request rejected",
  RESET_PASSWORD = "reset password",
}
export type EmailOtpPurpose = "signup" | "forgot-password" | "resend";

export const ERROR_MESSAGE = {
  UNAUTHORIZED_ACCESS_NOT_LOGIN: "Unauthorized access. You have'nt Logged in",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  UNAUTHORIZED_ROLE: "Your role is not allowed.",
  INVALID_TOKEN: "Access Denied due to Invalid token",
  TOKEN_EXPIRED_FORGOT: "Link Validity Expired. Try verify email once more",
  TOKEN_EXPIRED_ACCESS: "Access Token time out",
  TOKEN_EXPIRED_REFRESH: "Token time out, Please loggin again",
  SERVER_ERROR: "An error occurred, please try again later.",
  BLOCKED_ERROR: "You are blocked by Admin. please contact admin",
  NOT_FOUND: "Resource not found",
  USER_ALREADY_EXISTS :"User already registered.",
  VALIDATION:"Validation Error",
    INVALID_OTP: "invalid otp",
    RESTART_SIGNUP:"Form data expired or not found. Please restart signup"

};
export const SUCESS_MESSAGE={
  ACCOUNT_CREATED:"Account created successfully",
  LOGIN_SUCESS : "Logged in successfully",
   OTP_RESENT_SUCCESS: "OTP resend successfully",
  OTP_SEND_SUCCESS: "Otp send successfully",
  OTP_VERIFIED: "Otp verified successfully",
  OPERATION_SUCCESS: "Operation completed successfully.",
  IMAGE_UPLOADED_SUCCESSFULLY: "Image uploaded successfully",
  FCM_TOKEN_SAVED: "Fcm Token saved successfully",
  REQUEST_REJECTED: "Request Rejected",
  PROFILE_UPDATED_SUCCESS: "Profile updated successfully",
  RESET_LINK_SEND: "A password reset link has been sent to your email account",
  PASSWORD_CHANGED: "Password changed successfully",
  REGISTER_SUCCESS:"Register is sucessfully"
}

