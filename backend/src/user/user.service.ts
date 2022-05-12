import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserCreationInput } from './dto/userCreate.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findAll() {
        return this.userRepository.find();
    }

    async findOne(userId: User['id']) {
        return this.userRepository.findOne(userId);
    }

    async createUser(input: UserCreationInput) {
        input.createdAccountOn = new Date();
        // input.articlesCreated = null;
        const newUser = this.userRepository.create(input);
        const user = await this.userRepository.save(newUser);
        return { user };
    }
}
