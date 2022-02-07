import { Module } from '@nestjs/common';
import { LifeController } from './life.controller';
import { LifeService } from './life.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallyEntity, UserEntity } from '../database';

@Module({
  imports: [TypeOrmModule.forFeature([TallyEntity, UserEntity])],
  controllers: [LifeController],
  providers: [LifeService],
})
export class LifeModule {}
