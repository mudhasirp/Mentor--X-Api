import { IUserEntity } from "./userModel";

export interface IMentorEntity extends IUserEntity{
  experience: string;
  title: string;
  bio: string;
  socialProfiles: {
    platform: string;
    profileUrl: string;
    createdAt: Date;
  }[];
}