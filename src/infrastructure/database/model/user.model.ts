import mongoose,{Document,ObjectId} from "mongoose";
import { userSchema } from "../schemas/user.schema";
import { IUserEntity } from "../../../domain/entities/userModel";

export interface IUserModel extends Omit<IUserEntity,"_id">,Document{
    _id : ObjectId
}
export const UserModel=mongoose.model("users",userSchema)