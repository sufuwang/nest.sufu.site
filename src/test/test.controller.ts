import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  HttpCode,
  Header,
  Redirect,
  // HostParam,
  HttpException,
  HttpStatus,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { HttpExceptionFilter } from './error.filter';
import { RolesGuard } from './test.guard';
import { Roles } from './roles.decorator';

// @UseFilters(HttpExceptionFilter) // 整个 controller 使用 filter
@Controller('test')
// @Controller('book.sufu.site') // 指定二级域名
// @Controller(':domain.sufu.site') // 匹配二级域名
@UseGuards(RolesGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  // 匹配二级域名
  // @Get()
  // getDomain(@HostParam(':domain') domain: string) {
  //   return domain;
  // }

  @Roles('admin')
  @Get('test')
  test(): string {
    return 'test';
  }

  @Get('error')
  // @UseFilters(HttpExceptionFilter)
  // @UseFilters(new HttpExceptionFilter()) // 也可以交由 Nest 去实例化
  getError(): string {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException(
      { meg: 'Forbidden', name: 'getError', status: HttpStatus.OK },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('a/:id')
  getHello(@Param('id') id: string): string {
    console.info('id: ', id);
    return this.testService.getHello(id);
  }

  @Post()
  getHellos(@Body() body: any): string {
    return this.testService.getHellos(body);
  }

  @Get()
  @HttpCode(309)
  @Header('Cache-Control', 'none1')
  getAll(@Req() body: any): string {
    return this.testService.getAll(body);
  }

  @Get('re')
  @Redirect('/api/test/a/121212121212re', 302)
  re() {
    console.info('----');
    return '';
  }
}
