import { JwtPayload } from "jsonwebtoken";

export interface ITokenService{
    generateAcessToken(payload:{
        id:string,
        email:string,
        role:string,
        status ?:string,
    }):string;
    generateRefreshToken(payload:{
        id:string,
        email:string,
        role:string,
        status?:string;
    }):string;
    verifyAccessToken(token:string):JwtPayload | null;
    verifyRefreshToken(token:string):JwtPayload | null;
}




