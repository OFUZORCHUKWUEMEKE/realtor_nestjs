import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignupDto } from '../dto/SignUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('signup')
    SignUp(@Body() body:SignupDto){
       return   this.authService.SignUp(body)
    }

    @Post('/signin')
    SignIn(@Body() body:SignInDto){
       return this.authService.Signin(body)
    }
}
