import { IUserEntity } from "../../../../domain/entities/userModel";

export interface IUSerExistenceService{
    emailExists(email:string) : Promise<Boolean>
    getUserAndRoleByEmail(
        email:string
    ):Promise<{user:IUserEntity | null; role:string} | null>;
}