import { CourseService } from './course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from '../schemas/course.schema';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<{
        message: string;
        course: CourseDocument;
    }>;
    loadCourseData(): Promise<string>;
    getCoursesByInterval(start: string, end: string): Promise<CourseDocument[] | {
        message: string;
    }>;
}
