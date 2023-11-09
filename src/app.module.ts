import { Module } from '@nestjs/common';
import { EmailModule } from './emails/emails.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), EmailModule, UserModule],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}
