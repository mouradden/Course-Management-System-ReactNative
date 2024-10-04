import { CourseService } from './course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from './course.schema';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<{
        message: string;
        course: CourseDocument;
    }>;
    loadCourseData(): Promise<string>;
    getCoursesCount(): Promise<number>;
    getCoursesByInterval(start: string, end: string): Promise<CourseDocument[] | {
        message: string;
    }>;
    getSearchedCourses(searchQuery: string, page: number): Promise<CourseDocument[]>;
}
