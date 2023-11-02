import { Injectable } from '@nestjs/common';

interface User {
  name: string;
}

export interface AppServiceResponse {
  users: User[];
}

@Injectable()
export class AppService {
  getHello(): AppServiceResponse {
    return {
      users: [{ name: 'Max' }, { name: 'Bob' }],
    };
  }
}
