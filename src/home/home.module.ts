import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [HomeService,{
    provide:APP_INTERCEPTOR,
    useClass:ClassSerializerInterceptor
  }],
  controllers: [HomeController]
})
export class HomeModule {}
