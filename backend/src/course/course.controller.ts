import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseDocument } from '../schemas/course.schema'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  
  @Post('addNew')
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<{ message: string; course: CourseDocument }> {
    // console.log('body ', createCourseDto);
      const createdCourse = await this.courseService.createCourse(createCourseDto);
      return { message: 'Course created', course: createdCourse };
  }
  
  @Post('load')
  async loadCourseData(): Promise<string> {
    const filePath = `${process.cwd()}/data/courses_data.json`;
    await this.courseService.loadDataFromFile(filePath);
    return 'Data has been loaded';
  }
  @Get()
  async getCoursesCount(): Promise<number>{
    return await this.courseService.countCourses();
  }
  @Get('byInterval')
  async getCoursesByInterval(@Query('start') start: string, @Query('end') end: string) {
    const startIndex = parseInt(start, 10);
    const endIndex = parseInt(end, 10);


    if (isNaN(startIndex) || isNaN(endIndex) || startIndex >= endIndex) {
      return { message: 'Invalid interval' };
    }

    return this.courseService.getCoursesByInterval(startIndex, endIndex);
  }

  @Get('search')
  async getSearchedCourses(@Query('searchQuery') searchQuery: string, @Query('page') page: number){
    return this.courseService.searchCourses(searchQuery, page);
  }
}
