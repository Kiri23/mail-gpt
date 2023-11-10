import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CustomLogger } from './customLogger';
const engine = require('express-engine-jsx');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLogger(),
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('jsx');
  app.engine('jsx', engine);

  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
