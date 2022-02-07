import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { session } from './utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../database/user.entity';
import moment from '../utils/moment';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async test(res: Response) {
    res
      .status(HttpStatus.OK)
      .cookie('test', 'Test', {
        domain: '',
        secure: true,
        sameSite: 'none',
        maxAge: 1200000,
      })
      .send({
        status: HttpStatus.OK,
        message: '注册成功',
      });
  }

  /**
   * 使用 account, password 进行注册
   */
  async register(
    req: Request,
    res: Response,
    { account, password }: TypeLoginBody,
  ) {
    const { max_age, session_id } = await this.userRepository.save({
      account: account,
      password: password,
      session_id: session.get(),
      max_age: moment.getMileSecond({ hour: 1 }), // 单位: 毫秒
      create_time: moment.now(),
      update_time: moment.now(),
      timestamp: moment.getTimestamp().toString(),
    });
    res
      .status(HttpStatus.OK)
      .cookie('sessionId', session_id, {
        domain: 'http://sufu.site',
        httpOnly: true,
        maxAge: max_age,
      })
      .send({
        status: HttpStatus.OK,
        message: '注册成功',
      });
  }

  /**
   * 使用 account, password 进行登陆
   * 返回 sessionId , 存储在 cookies 中
   */
  async loginByPassword(
    req: Request,
    res: Response,
    { account, password, isCanRegister }: TypeLoginBody,
  ) {
    const item = await this.userRepository.findOne({ account });
    if (!item || item.password !== password || !item.session_id) {
      if (isCanRegister) {
        return await this.register(req, res, { account, password });
      }
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: '账户或密码错误' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!session.isValid(item.timestamp, item.max_age)) {
      item.session_id = session.get();
      item.update_time = moment.now();
      item.timestamp = moment.getTimestamp().toString();
      await this.userRepository.save(item);
    }
    const { session_id } = await this.userRepository.findOne({
      account,
      password,
    });
    res
      .status(HttpStatus.OK)
      .cookie('sessionId', session_id, {
        domain: 'localhost',
        secure: true,
        sameSite: 'none',
        maxAge: moment.getMileSecond({ hour: 1 }),
      })
      .send({
        status: HttpStatus.OK,
        message: '登陆成功',
        data: { account, avatarUrl: 'TEST' },
      });
  }

  /**
   * 使用 sessionId 进行登陆, 校验 sessionId 的有效性
   * 若 sessionId 无效, 则前端进行重定向
   */
  async loginBySessionId(
    req: Request,
    res: Response,
    { sessionId: session_id }: TypeLoginArgs,
  ) {
    const item = await this.userRepository.findOne({ session_id });
    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'session 不存在',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // 校验是否有效
    if (!session.isValid(item.timestamp, item.max_age)) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'session 失效',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: '登陆成功',
      data: { account: item.account, avatarUrl: 'TEST' },
    });
  }
}
