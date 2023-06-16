import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/service.service';
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import {UserType} from '@prisma/client'

interface SignUpParams {
    email: string
    password: string
    name: string
    phone: number
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }
    async SignUp({ email, password,name,phone }: SignUpParams) {
        const userExists = await this.prismaService.user.findFirst({
            where: {
                email
            }
        })
        console.log(userExists)
        if (userExists) {
            throw new ConflictException()
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prismaService.user.create({
            data:{
                email,
                name,
                phone:String(phone),
                password:hashedPassword,
                user_type:UserType.BUYER
            }
        })
        const token = jwt.sign({name,id:user.id},process.env.SECRET,{expiresIn:process.env.EXPIRES_IN} )
        // console.log(token)
        return token
    }
}
