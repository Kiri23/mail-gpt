import { Controller, Get, Redirect, Render, Response } from '@nestjs/common';

@Controller('')
export class AppController {
  constructor() {}

  @Get('/')
  @Redirect('/emails')
  index(@Response() res) {}
}
