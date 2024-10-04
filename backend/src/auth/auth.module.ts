// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy'; // Ensure to import LocalStrategy
import { LocalAuthGuard } from './local-auth.guard'; // Import LocalAuthGuard
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, JwtStrategy], // Add LocalAuthGuard here
  controllers: [AuthController],
  exports: [LocalAuthGuard], // Export LocalAuthGuard if needed
})
export class AuthModule {}
