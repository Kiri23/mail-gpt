import { Controller, Get, Render, Response } from '@nestjs/common';
import { AppService, AppServiceResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('layout')
  index(@Response() res) {
    res.locals.lang = 'en';
  }

  @Get('/users')
  @Render('users/index')
  getUsers(@Response() res): AppServiceResponse {
    res.locals.lang = 'en';
    return this.appService.getHello();
  }
}
