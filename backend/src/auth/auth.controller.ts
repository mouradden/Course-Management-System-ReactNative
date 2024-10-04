import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard) // Ensure you use the LocalAuthGuard for login
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    const { username, email, password } = body; // Destructure to get username, email, and password
    return this.authService.register(username, email, password); // Pass them to the register method
  }
}
