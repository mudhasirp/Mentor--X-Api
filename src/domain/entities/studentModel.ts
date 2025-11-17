import { IUserEntity } from "./userModel";

export interface IStudentModel extends IUserEntity{
  preferences: [string],
  emailNotifications?: boolean;
  smsNotifications?: boolean;
}