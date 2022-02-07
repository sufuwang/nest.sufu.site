import {
  Body,
  Controller,
  Post,
  Headers,
  Res,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { LifeService } from './life.service';
import { Response, Request, query } from 'express';
import { getOneFromSession } from '../utils/tools';
import { get } from 'https';

@Controller('life')
export class LifeController {
  constructor(private readonly service: LifeService) {}

  @Get('test')
  test(@Res() response: Response) {
    return this.service.test(response);
  }

  @Post('tally/add')
  addTally(
    @Res() response: Response,
    @Headers('Cookie') cookie: string,
    @Body() body: TypeTallyBody,
  ) {
    return this.service.addTally(
      response,
      getOneFromSession(cookie, 'sessionId'),
      body,
    );
  }

  @Get('tally/get')
  getTally(@Res() response: Response, @Query() query: TypeTallyQuery) {
    return this.service.getTally(response, query);
  }
}
