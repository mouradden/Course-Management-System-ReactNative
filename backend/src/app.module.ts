import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [DatabaseModule, CourseModule],
})
export class AppModule {}
