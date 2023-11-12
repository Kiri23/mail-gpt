import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/customLogger';
import { engine } from 'express-handlebars';

import * as session from 'express-session';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('hbs');
  app.engine('hbs', engine({ extname: '.hbs' }));

  app.use(
    session({
      secret: 'OxS5bkIcpCduSJrtZb6Hq6uvO5xq8V3M3LQDZFSgJos',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
