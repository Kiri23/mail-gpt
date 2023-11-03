import { Controller, Get, Render, Response } from '@nestjs/common';

@Controller('')
export class AppController {
  constructor() {}

  @Get('/')
  @Render('layout')
  index(@Response() res) {
    res.locals.lang = 'en';
  }
}
