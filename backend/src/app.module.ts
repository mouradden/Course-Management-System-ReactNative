import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [DatabaseModule, CourseModule, AuthModule, UserModule],
  controllers: [ProfileController],
  providers: [],
})
export class AppModule {}
