import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user.toObject();
        return result;
    }
    return null;
}


  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, email: string, password: string): Promise<{ status: number, message: string, user?: User }> {
    try {
      const existingEmailUser = await this.userService.findByEmail(email);
      if (existingEmailUser) {
        return {
          status: 400,
          message: 'Email already exists',
        };
      }
  
      const existingUsernameUser = await this.userService.findByUsername(username);
      if (existingUsernameUser) {
        return {
          status: 400,
          message: 'Username already exists',
        };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await this.userService.create(username, email, hashedPassword);
      return {
        status: 201,
        message: 'User registered successfully',
        user: newUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }
  
}
