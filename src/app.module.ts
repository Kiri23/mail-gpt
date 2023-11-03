import { Module } from '@nestjs/common';
import { EmailModule } from './emails/emails.module';
import { AppController } from './app.controller';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
