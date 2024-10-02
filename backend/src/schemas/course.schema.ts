import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructor: string;
  
  @Prop({ required: true })
  schedule: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
  
export interface CourseDocument extends Document {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
}

// import * as mongoose from "mongoose"

// export const CourseSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     instructor: { type: String, required: true },
//     schedule: { type: String, required: true },
// });