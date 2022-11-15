import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
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
        email: "fahimalizain@gmail.com",
        password: "Test_test123"
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
