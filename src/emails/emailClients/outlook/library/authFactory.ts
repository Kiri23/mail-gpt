import { Logger } from '@nestjs/common';
import { Authentication } from './auth';

export function createAuthentication() {
  const msalConfig = {
    auth: {
      clientId: process.env.OAUTH_CLIENT_ID || '',
      authority: process.env.OAUTH_AUTHORITY,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    },
    system: {
      customAgentOptions: { family: 4 },
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          if (!containsPii) Logger.log(message, 'MSAL Authentication');
        },
        piiLoggingEnabled: false,
        logLevel: 3,
      },
    },
  };

  return new Authentication(msalConfig);
}
