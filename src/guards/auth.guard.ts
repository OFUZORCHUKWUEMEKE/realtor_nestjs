import {CanActivate,ExecutionContext,Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/service/service.service';
import { Request } from 'express';
interface JWTPayload{
    name:string;
    id:number;
    iat:number;
    exp:number;
}


@Injectable()
export class AuthGuard implements CanActivate{
     constructor(private readonly reflector:Reflector,private prismaService:PrismaService){}
     async canActivate(context:ExecutionContext){
        const roles = this.reflector.getAllAndOverride('roles',[context.getHandler(),context.getClass()])
        if(roles?.length){
            const request = context.switchToHttp().getRequest<Request>()
            const token = await request.headers.authorization.split("")[1]
            try {
                const payload = await jwt.verify(token,process.env.PRODUCT_KEY_SECRET) as JWTPayload
                const user = await this.prismaService.user.findUnique({where:{id:payload.id}})
                if(!user) return false
                if(roles.includes(user.user_type)) return true;

                return false
            } catch (error) {
                return false 
            }
        }
         return true
     }
}