import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggerMiddleware } from './test/logger.middleware';
import {
  HttpExceptionFilter,
  AllExceptionFilter,
  GuardExceptionFilter,
} from './test/error.filter';
import { RolesGuard } from './test/test.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  // app.use(LoggerMiddleware); // 设置全局中间件
  // app.useGlobalFilters(new HttpExceptionFilter()); // 设置全局的异常过滤器
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter()); // 设置全局的异常过滤器, 继承自定义的异常过滤器
  app.useGlobalFilters(new GuardExceptionFilter()); // 设置全局的异常过滤器, 继承自定义的异常过滤器
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter)); // 设置全局的异常过滤器, 继承其它 Nest 基础异常过滤器
  // app.useGlobalGuards(new RolesGuard()); // 设置全局守卫
  await app.listen(3000);
}
bootstrap();
