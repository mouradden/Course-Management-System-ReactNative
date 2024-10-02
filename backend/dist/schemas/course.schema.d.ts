export declare class Course {
    title: string;
    description: string;
    instructor: string;
    schedule: string;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, import("mongoose").Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
export interface CourseDocument extends Document {
    title: string;
    description: string;
    instructor: string;
    schedule: string;
}
