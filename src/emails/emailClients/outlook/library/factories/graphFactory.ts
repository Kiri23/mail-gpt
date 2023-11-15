import { Request } from 'express';
import { Authentication } from '../auth';
import { MicrosoftGraph } from '../graph';

export function createMicrosoftClient(
  msalClien: Authentication,
  request: Request,
) {
  return new MicrosoftGraph(msalClien, request);
}
