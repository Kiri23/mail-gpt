import 'express-session';
import { Session, SessionData } from 'express-session';

// Im using this file to extend the express session interface
// and add typescript types to the values I'm storing in the session
declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare module 'express' {
  export interface Request {
    session: Session & Partial<SessionData>;
  }
}
