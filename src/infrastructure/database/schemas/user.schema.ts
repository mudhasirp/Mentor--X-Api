import mongoose from "mongoose"

import { ROLES } from "../../../shared/constants"
import { IUserModel } from "../model/user.model"

export const userSchema=new mongoose.Schema<IUserModel>({
    
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:Object.values(ROLES),
        default:ROLES.USER,
    },
    firstName : String,
    lastName:String,
    profilePicture:String,
    dateOfBirth:Date,
    createdAt:{type:Date,default:Date.now},
    googleId:{type:String, default:null},
    isActive:{type:Boolean,default:true},
    lastLogin:Date
})
