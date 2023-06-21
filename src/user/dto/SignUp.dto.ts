import { UserType } from '@prisma/client';
import {IsString,IsNotEmpty,IsEmail,MinLength,Matches,IsPhoneNumber,IsNumber, IsPositive, IsEnum, IsOptional} from 'class-validator'
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

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productKey?:string
}

export class SignInDto{
    
    @IsEmail()
    email:string;
    
    @IsString()
    password:string  
}

export class GenerateProductKeyDto{
    @IsEmail()
    email:string

    @IsEnum(UserType)
    userType:UserType;
     
}


