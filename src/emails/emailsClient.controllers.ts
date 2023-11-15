import { Controller, Get, Inject } from '@nestjs/common';
import {
  EMAIL_SERVICE,
  IEmailService,
} from './interfaces/emailService.interface';

@Controller('client/emails')
export class EmailsClientController {
  constructor(
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
  ) {}

  @Get('/')
  getEmails() {
    return this.emailService.getEmails();
  }
}
