import { IUserEntity } from "../../domain/entities/userModel";
import { IUserModel } from "../../infrastructure/database/model/user.model";

export class UserMapper{
    static toEntity(doc : IUserModel) : IUserEntity{
        return{
            _id : String(doc._id),
            firstName : doc.firstName,
            lastName : doc.lastName,
            email : doc.email,
            dateOfBirth : doc.dateOfBirth,
            role : doc.role,
            googleId : doc.googleId,
            password : doc.password,
            createdAt : doc.createdAt,
            username : doc.username,
            profilePicture : doc.profilePicture,    
            isActive:doc.isActive,
            lastLogin:doc.lastLogin  
        }
    }
}