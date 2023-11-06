import { Controller, Get, Render, Inject } from '@nestjs/common';
import { EmailOutlookResponse } from './emailClients/outlook/emailOutlook.service';
import { EMAIL_SERVICE, IEmailService } from './emailService.interface';

@Controller('emails')
export class EmailsController {
  constructor(
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
  ) {}

  @Get('/')
  @Render('emails/index')
  getEmails(): EmailOutlookResponse {
    return this.emailService.getEmails();
  }
}
