import { Body, Controller, Post, Headers, Header, Res } from '@nestjs/common';
import { SystemService } from './system.service';
import { Response, Request } from 'express';
import { v4 as uuid } from 'uuid';

@Controller('system')
export class SystemController {
  constructor(private readonly service: SystemService) {}
  @Post('login')
  @Header('Cache-Control', '300')
  // @Header('sessionId', uuid())
  login(
    @Res() request: Request,
    @Res() response: Response,
    @Headers('sessionId') sessionId: string,
    @Body() body: TypeLoginBody,
  ) {
    if (sessionId) {
      console.info('loginBySessionId');
      return this.service.loginBySessionId(request, response, { sessionId });
    }
    console.info('loginByPassword');
    return this.service.loginByPassword(request, response, body);
  }
}
