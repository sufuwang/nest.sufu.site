import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // OtherMiddleware, // 顺序绑定并执行中间件
        LoggerMiddleware,
      )
      // .exclude('/api/test/error') // exclude 不支持链式操作, 支持正则匹配
      .exclude(
        { path: '/api/test/test', method: RequestMethod.GET },
        '/api/test/error',
      )
      // .forRoutes('/test/a'); // 仅对某个路由有效
      .forRoutes(TestController);
  }
}
