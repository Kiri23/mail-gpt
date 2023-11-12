import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CustomLogger } from './logger/customLogger';
import { CustomExceptionFilter } from './exceptions/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalFilters(new CustomExceptionFilter());
 

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('hbs');
  app.engine('hbs', engine({ extname: '.hbs' }));

  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
