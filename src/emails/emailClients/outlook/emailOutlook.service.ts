import { Injectable } from '@nestjs/common';
import { IEmailService } from '../../interfaces/emailService.interface';

interface OutlookEmails {
  author: string;
  category?: string;
  description?: string;
  link?: string;
}

export interface EmailOutlookResponse {
  emails: OutlookEmails[];
}

@Injectable()
export class EmailOutlookService implements IEmailService {
  getEmails(): EmailOutlookResponse {
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
