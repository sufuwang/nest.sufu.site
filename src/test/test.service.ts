import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getHello(id: string): string {
    return `TestService Hello World!: ${id}`;
  }
  getHellos(body: any): any {
    return { id: 1, name: 'TestService', ...body };
  }
  getAll(res: any): any {
    console.info('res: ', res);
    return 'res';
  }
  getOther() {
    return '';
  }
}
