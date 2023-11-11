import {
  Controller,
  Get,
  Render,
  Inject,
  Res,
  Response,
  Redirect,
} from '@nestjs/common';
import { EmailOutlookResponse } from './emailClients/outlook/emailOutlook.service';
import { EMAIL_SERVICE, IEmailService } from './emailService.interface';
import { ConfigService } from '@nestjs/config';
import { Authentication } from './emailClients/outlook/library/auth';

@Controller('emails')
export class EmailsController {
  constructor(
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
    private configService: ConfigService,
    private readonly auth: Authentication,
  ) {}

  @Get('/')
  @Render('emails/index')
  getEmails(): EmailOutlookResponse {
    return this.emailService.getEmails();
  }

  @Get('/auth/signin')
  @Redirect()
  async getAuth(@Res() res: Response) {
    const scopes = this.configService.get<string>(
      'OAUTH_SCOPES',
      'https://graph.microsoft.com/.default',
    );
    const redirectUri = this.configService.get<string>('OAUTH_REDIRECT_URI');

    const urlParameters = {
      scopes: scopes.split(','),
      redirectUri: redirectUri,
    };
    const authUrl = await this.auth.getAuthCodeUrl(urlParameters);
    console.log(authUrl);
    return { url: authUrl, statusCode: 302 };
  }
}
