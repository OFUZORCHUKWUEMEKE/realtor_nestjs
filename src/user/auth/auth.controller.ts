import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../dto/SignUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('signup')
    SignUp(@Body() body:SignupDto){
       return   this.authService.SignUp(body)
    }
}
