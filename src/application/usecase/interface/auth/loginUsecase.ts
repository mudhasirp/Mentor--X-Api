import { IUserEntity } from "../../../../domain/entities/userModel";
import { LoginDTO } from "../../../dto/request/login.dto";
export interface ILoginUsecase{
    execute(data:LoginDTO):Promise<IUserEntity>
}