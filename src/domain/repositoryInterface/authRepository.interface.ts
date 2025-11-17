import { IUserEntity } from "../entities/userModel";
export interface IAuthRepository{
    findByEmail(email:string):Promise<IUserEntity | null>
    save(data:Partial<IUserEntity>):Promise<IUserEntity>
}