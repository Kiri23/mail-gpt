import {
  Controller,
  Get,
  Render,
  Inject,
  Redirect,
  Req,
  Query,
} from '@nestjs/common';
import { EmailOutlookResponse } from './emailClients/outlook/emailOutlook.service';
import {
  EMAIL_SERVICE,
  IEmailService,
} from './interfaces/emailService.interface';
import { ConfigService } from '@nestjs/config';
import { Authentication } from './emailClients/outlook/library/auth';
import { Request } from 'express';
import { AuthCallbackDto } from './dto/auth-callback.dto';

@Controller('emails')
export class EmailsController {
  scopes = this.configService.get<string>(
    'OAUTH_SCOPES',
    'https://graph.microsoft.com/.default',
  );
  redirectUri = this.configService.get<string>('OAUTH_REDIRECT_URI');

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
  async getAuth() {
    const urlParameters = {
      scopes: this.scopes.split(','),
      redirectUri: this.redirectUri,
    };
    const authUrl = await this.auth.getAuthCodeUrl(urlParameters);
    console.log(authUrl);
    return { url: authUrl, statusCode: 302 };
  }

  @Get('/auth/callback')
  @Redirect()
  async getCallback(@Req() req: Request, @Query() query: AuthCallbackDto) {
    console.log(req.query.code);
    const tokenRequest = {
      code: query.code,
      scopes: this.scopes.split(','),
      redirectUri: this.redirectUri,
    };
    const response = await this.auth.acquireTokenByCode(tokenRequest);
    req.session.userId = response.account.homeAccountId;
  }
}
