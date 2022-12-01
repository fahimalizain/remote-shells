import { AsyncLocalStorage } from 'async_hooks';

import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SignupDTO } from './dto';

@Injectable()
export class AuthService {
    storage: AsyncLocalStorage<any>;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
        this.storage = new AsyncLocalStorage();
    }

    async authenticateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.checkPassword(email, password);
        if (user) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
            ...user,
        };
    }

    async signup(user_data: SignupDTO) {
        const userExists = await this.usersService.findOne(user_data.email);
        if (userExists) {
            throw new ConflictException({
                message: 'Duplicate Email ID',
                error_code: 'DUPLICATE_EMAIL',
            });
        }

        return this.usersService.createUser(user_data);
    }

    async getProfile(email: string) {
        return this.usersService.getProfile(email);
    }

    getActiveUser() {
        const user = this.storage.getStore();
        if (user === undefined) {
            return {};
        }
        return user;
    }

    setActiveUser(user: any) {
        console.log('Set Active User', user);
        return this.storage.enterWith(user);
    }
}
