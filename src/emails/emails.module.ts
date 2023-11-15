import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { EmailsController } from './emails.controller';
import { EmailOutlookService } from './emailClients/outlook/emailOutlook.service';
import { EMAIL_SERVICE } from './interfaces/emailService.interface';

import {
  Authentication,
  createAuthentication,
} from './emailClients/outlook/library';
import { MicrosoftGraph } from './emailClients/outlook/library/graph';
import { createMicrosoftClient } from './emailClients/outlook/library/factories/graphFactory';
import { EmailsAuthController } from './emailsAuthentication.controller';
import { EmailsClientController } from './emailsClient.controllers';

@Module({
  imports: [ConfigModule],
  controllers: [EmailsController, EmailsAuthController, EmailsClientController],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: EmailOutlookService,
    },
    {
      provide: Authentication,
      useFactory: createAuthentication,
      inject: [ConfigService],
    },
    {
      provide: MicrosoftGraph,
      useFactory: (authentication: Authentication, request: Request) =>
        createMicrosoftClient(authentication, request),
      inject: [Authentication, REQUEST],
      scope: Scope.REQUEST,
    },
  ],
})
export class EmailModule {}
