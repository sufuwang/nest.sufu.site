import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from '../database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
