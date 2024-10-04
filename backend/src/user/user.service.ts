import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }


  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }


  async create(username: string, email: string, password: string): Promise<User> {

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = new this.userModel({ username, email, password });
    return user.save();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }
}
