import { Controller,Post,Body, Param, ParseEnumPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SignInDto, SignupDto } from '../dto/SignUp.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from "bcryptjs";
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('signup/:usertype')
    async SignUp(@Body() body:SignupDto,@Param('usertype',new ParseEnumPipe(UserType)) usertype:UserType){

       if(usertype!==UserType.BUYER){
         
         if(!body.productKey){
            throw new UnauthorizedException()
         }

         const validProductKey = `${body.email}-${usertype}-${process.env.PRODUCT_KEY_SECRET}`

         const isValidProductKey = await bcrypt.compare(validProductKey,body.productKey)

         if(!isValidProductKey){
            throw new UnauthorizedException()
         }
       }
      return this.authService.SignUp(body,usertype)
    }

    @Post('/signin')
    SignIn(@Body() body:SignInDto){
       return this.authService.Signin(body)
    }

   
    @Post('/key')
    generateKey(@Body() body:GenerateProductKeyDto){
      return this.authService.generateProductKey(body.email,body.userType)
    }
}
