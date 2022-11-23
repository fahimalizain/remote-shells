import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';

export type CreateUserDTO = Partial<User>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'guess-1',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess-1',
    },
    {
      userId: 3,
      email: 'fahimalizain@gmail.com',
      password: 'Test_test123',
    },
  ];

  async findOne(email: string): Promise<Model<UserDocument> | undefined> {
    return this.userModel.findOne({ email });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const user = new this.userModel(createUserDTO);
    user.password = await bcrypt.hash(user.password, 12);

    await user.save();
    const { password, ...strippedUser } = user.toObject();
    return strippedUser;
  }

  async checkPassword(email: string, password: string): Promise<Model<UserDocument> | undefined> {
    const user = await this.userModel.findOne({ email }, { email: string, password: string }).exec();
    console.log(user.email);
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
