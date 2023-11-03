import { Controller, Get, Render } from '@nestjs/common';
import { EmailService, EmailServiceResponse } from './email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly appService: EmailService) {}

  @Get('/')
  @Render('emails/index')
  getEmails(): EmailServiceResponse {
    return this.appService.getEmails();
  }
}
