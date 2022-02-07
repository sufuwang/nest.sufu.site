import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const req = http.getRequest() as Request;
    const res = http.getResponse() as Response;
    const { url, headers } = req;
    if (/^\/life.+/.test(url) && !headers['cookie']?.includes('sessionId')) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        status: HttpStatus.UNAUTHORIZED,
        message: 'sessionId 不存在, 请重新登陆',
      });
      return false;
    }
    return true;
  }
}
