import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { UserOutput } from '../dtos/user.object.dto';
import UserCreationInput from '../dtos/userCreation.dto';
import { UserEntity } from '../model/user.entity';
import { UserService } from '../user.service';

@Resolver(UserEntity)
export default class UserMutationsResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserOutput)
    async createNewUser(
        @Args({ name: 'newUser', type: () => UserCreationInput })
        newUser: UserCreationInput,
    ): Promise<UserOutput> {
        const newUserCreated = await this.userService.createNewUser(newUser);
        if (!newUserCreated.id) {
            throw new Error('User couldn\'t be created');
        }
        return newUserCreated;
    }

    @Mutation(() => Boolean)
    async deleteOneUserById(
        @Args({ name: 'userId', type: () => ID }) userId: string,
    ): Promise<boolean> {
        return await this.userService.deleteOneUserById(userId);
    }
}
