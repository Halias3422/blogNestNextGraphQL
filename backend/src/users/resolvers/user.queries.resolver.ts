import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UserOutput } from '../dtos/user.object.dto';
import { UserService } from '../user.service';

@Resolver()
export default class UserQueriesResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserOutput)
    async findOneUserById(
        @Args({ name: 'id', type: () => ID }) userId: string,
    ): Promise<UserOutput> {
        return await this.userService.findOneUserById(userId);
    }

    @Query(() => [UserOutput])
    async findAllUsers(): Promise<UserOutput[]> {
        return await this.userService.findAllUsers();
    }
}
