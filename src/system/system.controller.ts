import { Body, Controller, Post, Headers, Res, Req, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import { Response, Request } from 'express';
import { getOneFromSession } from '../utils/tools';

@Controller('system')
export class SystemController {
  constructor(private readonly service: SystemService) {}

  @Get('test')
  test(@Res() response: Response) {
    return this.service.test(response);
  }

  @Post('login')
  login(
    @Req() request: Request,
    @Res() response: Response,
    @Headers('Cookie') cookie: string,
    @Body() body: TypeLoginBody,
  ) {
    if (cookie) {
      const sessionId = getOneFromSession(cookie, 'sessionId');
      if (sessionId) {
        console.info('loginBySessionId');
        return this.service.loginBySessionId(request, response, { sessionId });
      }
    }
    console.info('loginByPassword');
    return this.service.loginByPassword(request, response, body);
  }

  @Post('register')
  register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: TypeLoginBody,
  ) {
    return this.service.register(request, response, body);
  }
}
