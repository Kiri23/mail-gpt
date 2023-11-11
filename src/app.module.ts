import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EmailModule } from './emails/emails.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import validationSchema from './config/configuration.schema';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    EmailModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
