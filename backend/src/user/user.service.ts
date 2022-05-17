import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { UserCreationInput } from './dto/userCreate.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async findOneById(userId: User['id']) {
        return await this.userRepository.findOne(userId);
    }

    async findOneByCredentials(userLogin: User['login'], userPassword: User['password']): Promise<User> {
        const foundUserByLogin = await this.userRepository.findOne({
            where: {
                login: userLogin,
            },
        });
        if (foundUserByLogin == null || foundUserByLogin == undefined) {
            return null;
        }
        const hashedPassword = this.hashNewUserPassword(userPassword, foundUserByLogin.salt);
        if (hashedPassword !== foundUserByLogin.password) {
            return null;
        }
        return foundUserByLogin;
    }

    async createUser(input: UserCreationInput) {
        if (await this.checkIfLoginIsTaken(input.login)) {
            return null;
        }
        input.salt = randomBytes(16).toString('hex');
        input.password = this.hashNewUserPassword(input.password, input.salt);
        input.createdAccountOn = new Date();
        // input.articlesCreated = null;
        const newUser = this.userRepository.create(input);
        const user = await this.userRepository.save(newUser);
        return user;
    }

    async checkIfLoginIsTaken(userLogin: string): Promise<boolean> {
        const loginTaken = await this.userRepository.findOne({
            where: {
                login: userLogin,
            },
        });
        if (loginTaken == null || loginTaken == undefined) {
            return false;
        }
        return true;
    }

    hashNewUserPassword(password: string, salt: string): string {
        const newPassword: string = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return newPassword;
    }
}
