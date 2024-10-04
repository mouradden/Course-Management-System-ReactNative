import { Model } from 'mongoose';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from './course.schema';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    getCoursesByInterval(start: number, end: number): Promise<CourseDocument[]>;
    countCourses(): Promise<number>;
    createCourse(createCourseDto: CreateCourseDto): Promise<CourseDocument>;
    loadDataFromFile(filePath: string): Promise<void>;
    searchCourses(searchQuery: string, page: number): Promise<CourseDocument[]>;
}
