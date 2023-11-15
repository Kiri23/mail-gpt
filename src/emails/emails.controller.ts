import { Controller, Get, Render } from '@nestjs/common';

@Controller('emails')
export class EmailsController {
  constructor() {}

  @Get('/')
  @Render('emails/index')
  getEmails() {
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
