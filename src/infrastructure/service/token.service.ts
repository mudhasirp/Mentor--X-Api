import jwt,{Secret,JwtPayload} from "jsonwebtoken"

import ms from "ms"
import { injectable } from "tsyringe"

import { CustomError } from "../../domain/errors/customErrors"

import { ITokenService } from "../../domain/service-interfaces/token-service.interface"

import { config } from "../../shared/config"

import { HTTP_STATUS } from "../../shared/constants"
export interface JwtPayloadData {
    id:string;
    email:string;
    role:string;
    status?:"pending" | "verified" | "rejected"
}

export class TokenService implements ITokenService{
    private accessSecret :Secret;
    private accessExpiresIn:string;

    private refreshSecret:Secret;
    private refreshExpiresIn:string;

    constructor(){
        this.accessSecret=config.jwt.ACCESS_SECRET_KEY;
        this.accessExpiresIn=config.jwt.ACCESS_EXPIRES_IN;

        this.refreshSecret=config.jwt.REFRESH_SECRET;
        this.refreshExpiresIn=config.jwt.REFRESH_EXPIRES_IN

    }
    generateAcessToken(payload: JwtPayloadData): string {
        return jwt.sign(payload,this.accessSecret,{
            expiresIn:this.accessExpiresIn as ms.StringValue
        })
    }
    generateRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload,this.refreshSecret,{
            expiresIn:this.refreshExpiresIn as ms.StringValue,
        })
    }
    verifyAccessToken(token: string): JwtPayload | null {
        try{
            return jwt.verify(token,this.accessSecret) as JwtPayload
        }catch(error){
            return null
        }
    }
    verifyRefreshToken(token: string): JwtPayload | null {
        try{
            return jwt.verify(token,this.refreshSecret) as JwtPayload
        }catch(error){
            return null
        }
    }
}