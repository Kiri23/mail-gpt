import {
  AuthenticationResult,
  AuthorizationCodeRequest,
  AuthorizationUrlRequest,
  ConfidentialClientApplication,
  Configuration,
} from '@azure/msal-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Authentication {
  private client: ConfidentialClientApplication;
  private configuration: Configuration;
  private readonly scopes = this.configService.get<string>(
    'OAUTH_SCOPES',
    'https://graph.microsoft.com/.default',
  );

  constructor(
    configuration: Configuration,
    private configService: ConfigService,
  ) {
    this.configuration = configuration;
    this.client = new ConfidentialClientApplication(this.configuration);
  }

  async getAccessToken(userId?: string): Promise<string> {
    const account = await this.client
      .getTokenCache()
      .getAccountByHomeId(userId);

    const scopes = this.scopes.split(',');
    const response = await this.client.acquireTokenSilent({
      scopes: scopes,
      account: account,
    });
    return response.accessToken;
  }

  async getAuthCodeUrl(
    authCodeUrlParameters: AuthorizationUrlRequest,
  ): Promise<string> {
    try {
      return await this.client.getAuthCodeUrl(authCodeUrlParameters);
    } catch (error) {
      console.error('Error getting auth code URL', error);
      throw error;
    }
  }

  async acquireTokenByCode(
    tokenRequest: AuthorizationCodeRequest,
  ): Promise<AuthenticationResult> {
    try {
      return await this.client.acquireTokenByCode(tokenRequest);
    } catch (error) {
      console.error('Error acquiring token by code', error);
      throw error;
    }
  }
}
