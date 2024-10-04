import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://culeden:Fl026nvJrFZI7lYZ@cluster0.ct384.mongodb.net/Courses?retryWrites=true&w=majority&appName=Cluster0')], //should be at .env file
})
export class DatabaseModule {}
