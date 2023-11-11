import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  @Get('/settings')
  @Render('user/userSettings')
  renderSettings() {}
}
