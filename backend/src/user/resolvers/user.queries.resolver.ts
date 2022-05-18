import { Args, Query, Resolver } from "@nestjs/graphql";
import { UserOutput } from "../dto/userCreate.dto";
import { User } from "../models/user.model";
import { UserService } from "../user.service";

@Resolver(User)
export class UserQueriesResolver {
    constructor(private userService: UserService) { }

    @Query(() => User)
    async returnOneUserById(userId: User['id']) {
        return await this.userService.findOneById(userId);
    }

    @Query(() => [User])
    async returnAllUsers() {
        return this.userService.findAll();
    }

    @Query(() => UserOutput)
    async findOneUserByCredentials(
        @Args('login', { type: () => String }) login: User['login'],
        @Args('password', { type: () => String }) password: User['password']) {
        const user: User = await this.userService.findOneByCredentials(login, password);
        if (user) {
            return {
                login: user.login,
                id: user.id,
            };
        }
        return {};
    }

}