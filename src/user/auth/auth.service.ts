import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/service.service';
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import { User, UserType } from '@prisma/client'

interface SignUpParams {
    email: string
    password: string
    name: string
    phone: number
}

interface SignInParams {
    email: string
    password: string

}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }
    async SignUp({ email, password, name, phone }: SignUpParams) {
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
            data: {
                email,
                name,
                phone: String(phone),
                password: hashedPassword,
                user_type: UserType.BUYER
            }
        })
        const token = await this.generateJWT(user.name,user.id)
        // console.log(token)
        return token
    }


    async Signin({ email, password }: SignInParams) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new HttpException('User not Found in the Database', 400)
        }

        // console.log(password)

        const hashedPassword = (await user).password

        const isValidPassword = await bcrypt.compare(password, hashedPassword)

        if (!isValidPassword) {
            throw new HttpException('Invalid Credentials', 400)
        }

         return await this.generateJWT((await user).name,(await user).id)
    }

    private async generateJWT(name:string,id:number){
        const token = await jwt.sign({
            name,
            id
        }, process.env.SECRET, { expiresIn: process.env.EXPIRES_IN })
        return token
    }
}
