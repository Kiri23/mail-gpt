import { Controller, Get, Redirect, Req, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Authentication } from './emailClients/outlook/library/auth';
import { Request } from 'express';
import { AuthCallbackDto } from './dto/auth-callback.dto';

@Controller('emails/auth')
export class EmailsAuthController {
  private readonly scopes = this.configService.get<string>(
    'OAUTH_SCOPES',
    'https://graph.microsoft.com/.default',
  );
  private readonly redirectUri =
    this.configService.get<string>('OAUTH_REDIRECT_URI');

  constructor(
    private configService: ConfigService,
    private readonly auth: Authentication,
  ) {}

  @Get('/signin')
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

  @Get('/callback')
  @Redirect()
  async getCallback(@Req() req: Request, @Query() query: AuthCallbackDto) {
    const tokenRequest = {
      code: query.code,
      scopes: this.scopes.split(','),
      redirectUri: this.redirectUri,
    };
    const response = await this.auth.acquireTokenByCode(tokenRequest);
    req.session.userId = response.account.homeAccountId;
    req.session.isAuthenticated = true;
    return { url: '/client/emails', statusCode: 302 };
  }
}
