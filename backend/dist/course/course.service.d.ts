import { Model } from 'mongoose';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from '../schemas/course.schema';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    getCoursesByInterval(start: number, end: number): Promise<CourseDocument[]>;
    createCourse(createCourseDto: CreateCourseDto): Promise<CourseDocument>;
    loadDataFromFile(filePath: string): Promise<void>;
}
