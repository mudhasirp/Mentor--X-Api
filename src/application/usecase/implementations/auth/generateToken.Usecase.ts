import { inject,injectable } from "tsyringe";

import { ITokenService } from "../../../../domain/service-interfaces/token-service.interface";
import { IGenerateTokenUseCase } from "../../interface/auth/generateToken.usecase";

@injectable()
export class GenerateTokenUsecase implements IGenerateTokenUseCase{
    constructor(
        @inject("ITokenService")
        private _tokenService:ITokenService
    ){}
    async execute(id: string, email: string, role: string, status?: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const payload={
            id,
            email,
            role,
            ...(status && {status}),
        };
        const accessToken = this._tokenService.generateAcessToken(payload)
        const refreshToken=this._tokenService.generateRefreshToken(payload)
        return {
            accessToken,
            refreshToken
        }
    }
}