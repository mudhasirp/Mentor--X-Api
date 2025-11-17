import { injectable } from "tsyringe";

import { IUserEntity } from "../../domain/entities/userModel";
import { IOTPRepository } from "../../domain/repositoryInterface/otp-repository.interface";
import redisClient from "../config/database/redis.config";
import { stringify } from "querystring";

@injectable()
export class OTPRepositoy implements IOTPRepository {
    async saveOtp(email: string, otp: string): Promise<void> {
        const payload = {
            otp,
            email,
            createdAt: Date.now()
        }
        await redisClient.set(`otp:${email}`, JSON.stringify(payload), { EX: 60 })
    }
    async deleteOtp(email: string): Promise<void> {
        await redisClient.del(`otp:${email}`)
    }
    async getOtp(email: string): Promise<{ otp: string; email: string; createdAt: number; } | null> {
        const data = await redisClient.get(`otp:${email}`);
        if (!data) return null
        return JSON.parse(data)
    }
    async storeFormData(email: string, data: Record<string, any>): Promise<void> {
        await redisClient.set(`signup:${email}`, JSON.stringify(data), { EX: 180 });
    }

    async getFormData(email: string): Promise<IUserEntity | null> {
        const key = `signup:${email}`;
        console.log("Fetching Redis key:", key)
        const data = await redisClient.get(key)
        if (!data) {
            console.warn("no data found in redis for key:", key)
            return null
        }
        try {
            console.log(JSON.parse(data))
            return JSON.parse(data)
        } catch (err) {
            console.error("failed to parse Redis Data", err)
            return null
        }
    }
    async deleteFormData(email: string): Promise<void> {
        await redisClient.del(`signup:${email}`)
    }
}