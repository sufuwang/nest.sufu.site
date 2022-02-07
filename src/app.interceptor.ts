import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const { hostname, method, headers } = http.getRequest<Request>();
    console.info(hostname, method, headers.origin);
    const isDevelopment = ['localhost', '127.0.0.1'].includes(hostname);
    const res = http.getResponse();

    if (isDevelopment) {
      res.set('Access-Control-Allow-Origin', headers.origin);
      // res.set('Access-Control-Allow-Methods', '*');
      // res.set('Access-Control-Allow-Headers', '*');
    }

    return next.handle();
  }
}
