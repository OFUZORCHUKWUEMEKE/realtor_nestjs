import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import * as jwt from 'jsonwebtoken'

export class UserInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest()

        const token = request?.headers?.authorization?.split(" ")[1]

        const user = await jwt.verify(token, process.env.PRODUCT_KEY_SECRET);
        request.user = user
        return handler.handle()
    }
} 