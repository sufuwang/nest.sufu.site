import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TallyEntity, UserEntity } from '../database';
import moment from '../utils/moment';

@Injectable()
export class LifeService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TallyEntity)
    private readonly tallyRepository: Repository<TallyEntity>,
  ) {}

  async test(res: Response) {
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: '注册成功',
    });
  }

  /**
   * 新增一条 tally 数据
   */
  async addTally(
    res: Response,
    sessionId: string,
    { create_date, data }: TypeTallyBody,
  ) {
    const { account } = await this.userRepository.findOne({
      session_id: sessionId,
    });
    data.forEach(async (d) => {
      await this.tallyRepository.insert({
        ...d,
        account,
        create_time: create_date,
        update_time: create_date,
      });
    });
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: '新建成功',
    });
  }

  /**
   * 获取 tally 数据
   * 可以根据 query 进行筛选, 默认获取所有
   */
  async getTally(
    res: Response,
    { begin_date = moment.getDate(), delay = 10 }: TypeTallyQuery,
  ) {
    // const ds = await this.tallyRepository
    //   .createQueryBuilder('tally')
    //   .where('tally.create_time LIKE :param')
    //   .setParameters({
    //     param: moment.getDate() + '%',
    //   })
    //   .orderBy('tally.id', 'ASC')
    //   .getMany();
    const ds = await this.tallyRepository.find();
    const data = [];
    ds.forEach((item) => {
      const { create_time, account, outcome } = item;
      const createTime = moment.getDate({ time: create_time });
      const targetIndex = data.findIndex(
        ({ name, date }) => account === name && date === createTime,
      );
      if (targetIndex >= 0) {
        data[targetIndex] = {
          ...data[targetIndex],
          subTotal: data[targetIndex].subTotal + outcome,
          data: [...data[targetIndex].data, item],
        };
      } else {
        data.push({
          id: parseInt((Math.random() * 10000).toString(), 10),
          date: createTime,
          name: account,
          subTotal: outcome,
          data: [item],
        });
      }
    });
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      message: '查询成功',
      data,
    });
  }
}
