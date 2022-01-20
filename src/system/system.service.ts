import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { session } from './utils';

@Injectable()
export class SystemService {
  /**
   * 使用 username, password 进行登陆
   * 返回 sessionId , 存储在 cookies 中
   */
  loginByPassword(
    req: Request,
    res: Response,
    { username, password }: TypeLoginBody,
  ) {
    if (username !== 'admin') {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: '不存在此用户' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (password !== 'admin') {
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: '密码错误' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    res
      .status(HttpStatus.OK)
      .cookie('sessionId', session.get({ isSave: true }), {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
      })
      .send({ status: HttpStatus.OK, message: '登陆成功' });
  }

  /**
   * 使用 sessionId 进行登陆, 校验 sessionId 的有效性
   * 若 sessionId 无效, 则前端进行重定向
   */
  loginBySessionId(req: Request, res: Response, { sessionId }: TypeLoginBody) {
    if (!session.isValid(sessionId)) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'session 失效',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // 数据库中校验 session 是否存在
    if (sessionId !== 'sessionId-admin') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: '自动登陆失败, 请重新登陆',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { status: HttpStatus.OK, message: '登陆成功' };
  }
}
