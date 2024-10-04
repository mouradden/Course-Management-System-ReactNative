import { Controller, Post, Get, Request, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
// import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.userService.create(username, password, email);
  }

  // @UseGuards(AuthGuard)
  // @Get()
  // async getProfile(@Request() req) {
  //     return this.userService.getUserProfile(req.user.id);
  // }
}
