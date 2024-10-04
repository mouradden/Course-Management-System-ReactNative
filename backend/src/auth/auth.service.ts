import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema'; // Import the User interface
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username); // Ensure you're using the correct method
    if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user.toObject(); // Convert Mongoose document to plain object
        return result; // Return the user object without the password
    }
    return null; // Return null if user not found or password doesn't match
}


  async login(user: any) {
    console.log('user ', user);
    const payload = { username: user.username, sub: user._id }; // Use username instead of email
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, email: string, password: string): Promise<User> {
    // Check if the email already exists
    const existingEmailUser = await this.userService.findByEmail(email);
    if (existingEmailUser) {
      throw new Error('Email already exists');
    }

    // Check if the username already exists
    const existingUsernameUser = await this.userService.findByUsername(username);
    if (existingUsernameUser) {
      throw new Error('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object using UserService's create method
    return this.userService.create(username, email, hashedPassword);
  }
}
