import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../schemas/course.schema';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from '../schemas/course.schema';
import * as fs from 'fs';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async getCoursesByInterval(start: number, end: number): Promise<CourseDocument[]> {
    const limit = end - start;
    return this.courseModel.find().skip(start).limit(limit).exec();
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseDocument> {
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }
  async loadDataFromFile(filePath: string): Promise<void> {
    const courseCount = await this.courseModel.countDocuments().exec();
    console.log("count ", courseCount);
    if (courseCount === 0) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      await this.courseModel.insertMany(data);
      console.log('Data has been loaded');
    } else {
      console.log('Data already exists, skipping insertion.');
    }
  }
}
