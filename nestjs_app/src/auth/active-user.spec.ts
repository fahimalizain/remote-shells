import { Test, TestingModule } from '@nestjs/testing';
import { ActiveUser } from './active-user';

describe('User', () => {
  let provider: ActiveUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActiveUser],
    }).compile();

    provider = module.get<ActiveUser>(ActiveUser);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
