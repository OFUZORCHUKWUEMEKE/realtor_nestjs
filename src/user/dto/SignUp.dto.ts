import {IsString,IsNotEmpty,IsEmail,MinLength,Matches,IsPhoneNumber,IsNumber, IsPositive} from 'class-validator'
export class SignupDto{
    @IsString()
    @IsNotEmpty()
    name:string;
     
    // @IsString()
    @IsNumber()
    @IsPositive()
    phone:number;


    @IsEmail()
    email:string;
    
    @IsString()
    @MinLength(5)
    password:string
}

export class SignInDto{
    
    @IsEmail()
    email:string;
    
    @IsString()
    password:string  
}