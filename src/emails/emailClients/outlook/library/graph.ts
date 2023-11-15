import { Client } from '@microsoft/microsoft-graph-client';
import { Authentication } from './auth';
import { Injectable, Scope, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class MicrosoftGraph {
  private client: Client;
  constructor(msalClient: Authentication, request: Request) {
    // I need to check if the user is authenticated before I can create the client
    if (!request.session.isAuthenticated) return;

    if (!msalClient || !request.session.userId) {
      throw new Error(
        `Invalid MSAL state. Client: ${
          msalClient ? 'present' : 'missing'
        }, User ID: ${request.session.userId ? 'present' : 'missing'}`,
      );
    }

    // This is the recommended way but how do I pass the session and the user ID so I can exchange a token?
    // this.client = Client.initWithMiddleware({ authProvider: msalClient });

    this.client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await msalClient.getAccessToken(request.session.userId);
          done(null, token);
        } catch (error) {
          Logger.error(error, ['MicrosoftClient']);
          done(error, null);
        }
      },
    });
  }

  getuserDetails() {
    return this.client
      ?.api('/me')
      .select('displayName,userPrincipalName')
      .get();
  }
}
