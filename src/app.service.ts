import { Injectable } from '@nestjs/common';

interface User {
  author: string;
  category?: string;
  description?: string;
  link?: string;
}

export interface AppServiceResponse {
  emails: User[];
}

@Injectable()
export class AppService {
  getHello(): AppServiceResponse {
    return {
      emails: [
        {
          author: 'Max',
          category: 'newsletter',
          description: 'give your one second deal. Dont wait unitl is to late',
          link: '#',
        },
        {
          author: 'Bob',
          category: 'Ai',
          description:
            'AI is breaking the world. Check out this tool from future tool',
          link: '#',
        },
      ],
    };
  }
}
