import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import UserCreationInput from '../dtos/userCreation.dto';
import { UserEntity } from '../model/user.entity';
import { UserService } from '../user.service';

@Resolver(UserEntity)
export default class UserMutationsResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => Boolean)
    async createNewUser(
        @Args({ name: 'newUser', type: () => UserCreationInput })
        newUser: UserCreationInput,
    ): Promise<boolean> {
        return await this.userService.createNewUser(newUser);
    }

    @Mutation(() => Boolean)
    async deleteOneUserById(
        @Args({ name: 'userId', type: () => ID }) userId: string,
    ): Promise<boolean> {
        return await this.userService.deleteOneUserById(userId);
    }
}
