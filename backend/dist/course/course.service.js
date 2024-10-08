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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./course.schema");
const fs = require("fs");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async getCoursesByInterval(start, end) {
        const limit = end - start;
        return this.courseModel.find().skip(start).limit(limit).exec();
    }
    async countCourses() {
        const courseCount = await this.courseModel.countDocuments().exec();
        return courseCount;
    }
    async createCourse(createCourseDto) {
        const newCourse = new this.courseModel(createCourseDto);
        return newCourse.save();
    }
    async loadDataFromFile(filePath) {
        const courseCount = await this.courseModel.countDocuments().exec();
        if (courseCount === 0) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            await this.courseModel.insertMany(data);
            console.log('Data has been loaded');
        }
        else {
            console.log('Data already exists, skipping insertion.');
        }
    }
    async searchCourses(searchQuery, page) {
        const regex = new RegExp(`\\b${searchQuery}\\b`, 'i');
        const courses = await this.courseModel.find({
            $or: [
                { title: { $regex: regex } },
                { instructor: { $regex: regex } }
            ]
        })
            .skip((page - 1) * 4)
            .limit(4);
        return courses;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
//# sourceMappingURL=course.service.js.map