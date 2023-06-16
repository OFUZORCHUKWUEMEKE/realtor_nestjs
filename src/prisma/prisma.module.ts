import { Module } from '@nestjs/common';
import { PrismaService } from './service/service.service';

@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
