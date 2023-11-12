import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EmailsController } from './emails.controller';
import { EmailOutlookService } from './emailClients/outlook/emailOutlook.service';
import { EMAIL_SERVICE } from './interfaces/emailService.interface';

import {
  Authentication,
  createAuthentication,
} from './emailClients/outlook/library';

@Module({
  imports: [ConfigModule],
  controllers: [EmailsController],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: EmailOutlookService,
    },
    {
      provide: Authentication,
      useFactory: createAuthentication,
    },
  ],
})
export class EmailModule {}
