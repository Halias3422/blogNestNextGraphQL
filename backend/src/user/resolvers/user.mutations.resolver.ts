import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { UserCreationInput, UserCreationOutput } from '../dto/userCreate.dto';
import { GraphQLError } from 'graphql';

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => Boolean)
    async createUser(@Args('input') input: UserCreationInput) {
        const res: User =
            await this.userService.createUser(input);
        if (!res) {
            // throw new Error('Login already taken.');
            return false;
        }
        return true;
    }
}