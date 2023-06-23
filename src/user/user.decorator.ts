import { SetMetadata ,createParamDecorator,ExecutionContext} from '@nestjs/common';
import { Request } from 'express';
// import { request } from 'http';

export const User = createParamDecorator((cx:ExecutionContext,data)=>{
    const request = cx.switchToHttp().getRequest()
    return request.user
})
