import {
  AuthenticationResult,
  AuthorizationCodeRequest,
  AuthorizationUrlRequest,
  ConfidentialClientApplication,
  Configuration,
} from '@azure/msal-node';

const msal = require('@azure/msal-node');

export class Authentication {
  private client: ConfidentialClientApplication;
  private configuration: Configuration;
  constructor(configuration: Configuration) {
    this.configuration = configuration;
    this.client = new msal.ConfidentialClientApplication(this.configuration);
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
