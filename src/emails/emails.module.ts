import { Module } from '@nestjs/common';

import { EmailsController } from './emails.controller';
import { EmailOutlookService } from './emailsProviders/emailOutlook.service';
import { EMAIL_SERVICE } from './emailService.interface';

@Module({
  imports: [],
  controllers: [EmailsController],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: EmailOutlookService,
    },
  ],
})
export class EmailModule {}
