import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(
  // HttpException, // 支持过滤多个错误类型
  HttpException,
)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost, args?: any) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      time: new Date().toISOString(),
      path: req.url,
      id: 'HttpExceptionFilter',
      ...args,
    });
  }
}

// 可以 @Catch 不传任何参数, 以捕获所有错误类型
@Catch()
// export class AllExceptionFilter extends BaseExceptionFilter {
export class AllExceptionFilter extends HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // const ctx = host.switchToHttp();
    // const res = ctx.getResponse<Response>();
    // const req = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    // res.status(status).json({
    //   statusCode: status,
    //   time: new Date().toISOString(),
    //   path: req.url,
    //   id: 'AllExceptionFilter',
    // });
    super.catch(exception, host, { name: 'allException' }); // 异常捕获逻辑一定要在 super 前
  }
}

@Catch(UnauthorizedException)
// export class AllExceptionFilter extends BaseExceptionFilter {
export class GuardExceptionFilter extends HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // const ctx = host.switchToHttp();
    // const res = ctx.getResponse<Response>();
    // const req = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    // res.status(status).json({
    //   statusCode: status,
    //   time: new Date().toISOString(),
    //   path: req.url,
    //   id: 'AllExceptionFilter',
    // });
    super.catch(exception, host, { name: 'UnauthorizedException' }); // 异常捕获逻辑一定要在 super 前
  }
}
