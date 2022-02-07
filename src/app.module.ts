import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlInfo } from './utils/db';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { SystemModule } from './system/system.module';
import { LifeModule } from './life/life.module';

@Module({
  imports: [
    SystemModule,
    LifeModule,
    TypeOrmModule.forRoot({
      ...MysqlInfo,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
