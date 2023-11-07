import { Module } from '@nestjs/common';
import { EmailModule } from './emails/emails.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EmailModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
