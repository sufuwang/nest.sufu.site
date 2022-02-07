import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: /^http:\/\/localhost:3[0-9]{3}/,
      credentials: true,
      allowedHeaders: 'content-type',
    },
  });
  app.useGlobalGuards(new AuthGuard());
  await app.listen(4000);
}
bootstrap();
