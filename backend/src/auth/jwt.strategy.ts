// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

type UserType = {
    username: string;
    email: string;
  }
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your-secret-key', // Use the same secret used in JwtModule
        });
    }

    async validate(payload: { username: string; sub: string }): Promise<UserType> {
        const user = await this.userService.findByUsername(payload.username);
        return user; // Return user object or null if user is not found
    }
}
