import { Injectable } from '@nestjs/common';
import { IEmailService } from '../../interfaces/emailService.interface';
import { MicrosoftGraph } from './library/graph';

@Injectable()
export class EmailOutlookService implements IEmailService {
  constructor(private readonly microsoftGraph: MicrosoftGraph) {}

  async getEmails() {
    const user = await this.microsoftGraph.getuserDetails();

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
