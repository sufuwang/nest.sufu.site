// import { Injectable, NestMiddleware } from '@nestjs/common';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     console.info('------req------');
//     setTimeout(next, 3000);
//   }
// }

export const LoggerMiddleware = (req: any, res: any, next: () => void) => {
  console.info('---function---req------');
  setTimeout(next, 3000);
};
