import { injectable } from "tsyringe";
import { IAuthRepository } from "../../domain/repositoryInterface/authRepository.interface";
import { BaseRepository } from "./baseRepository";
import { IUserEntity } from "../../domain/entities/userModel";
import {  IUserModel, UserModel } from "../database/model/user.model";
import { UserMapper } from "../../application/mapper/user.mapper";

@injectable()
export class AuthRepository 
  extends BaseRepository< IUserModel,IUserEntity>
  implements IAuthRepository
  {
    constructor(){
        super(UserModel)
    }
    async findByEmail(email: string): Promise<IUserEntity | null> {
        const user=await UserModel.findOne({email}).exec()

        return user ? UserMapper.toEntity(user) : null
    }
  }