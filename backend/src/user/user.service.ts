import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'; // User schema interface

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Find a user by email
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec(); // Use MongoDB findOne
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  // Find a user by email (needed in AuthService)
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Create a new user
  async create(username: string, email: string, password: string): Promise<User> {
    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = new this.userModel({ username, email, password }); // Create a user instance
    return user.save(); // Save the user to MongoDB
  }

  // Find user by ID
  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec(); // Use MongoDB findById
  }
}
