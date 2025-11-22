import { Request,Response,NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { CustomError } from "../../domain/errors/customErrors";
import { TokenService } from "../../infrastructure/service/token.service";
import { COOKIES_NAMES,ERROR_MESSAGE,HTTP_STATUS } from "../../shared/constants";

const tokenService=new TokenService()

export const verifyAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token=req.cookies["access_token"];
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const payload=tokenService.verifyAccessToken(token)
        if(!payload){
            return res.status(401).json({message:"Invalid or expired token"})
        }
        (req as any).user=payload
        next()
    }
    
    catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}
export const authorizeRole=(roles:string[])=>{
    return (req:any,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"forbiddem"})
        }
        next()
    }
}