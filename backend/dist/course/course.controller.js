"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("../dto/create-course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(createCourseDto) {
        const createdCourse = await this.courseService.createCourse(createCourseDto);
        return { message: 'Course created', course: createdCourse };
    }
    async loadCourseData() {
        const filePath = `${process.cwd()}/data/courses_data.json`;
        await this.courseService.loadDataFromFile(filePath);
        return 'Data has been loaded';
    }
    async getCoursesCount() {
        return await this.courseService.countCourses();
    }
    async getCoursesByInterval(start, end) {
        const startIndex = parseInt(start, 10);
        const endIndex = parseInt(end, 10);
        if (isNaN(startIndex) || isNaN(endIndex) || startIndex >= endIndex) {
            return { message: 'Invalid interval' };
        }
        return this.courseService.getCoursesByInterval(startIndex, endIndex);
    }
    async getSearchedCourses(searchQuery, page) {
        return this.courseService.searchCourses(searchQuery, page);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)('addNew'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)('load'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "loadCourseData", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesCount", null);
__decorate([
    (0, common_1.Get)('byInterval'),
    __param(0, (0, common_1.Query)('start')),
    __param(1, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesByInterval", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('searchQuery')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getSearchedCourses", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map