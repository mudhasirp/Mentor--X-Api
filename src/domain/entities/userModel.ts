import { ROLES } from "../../shared/constants";

export interface IUserEntity{
    _id:string,
    username:string,
    email:string,
    password : string,
    role :ROLES,
    firstName:string,
    lastName:string,
    profilePicture:string,
    dateOfBirth:Date,
    createdAt:Date,
    googleId:string|null,
    isActive?:boolean,
    lastLogin?: Date
}