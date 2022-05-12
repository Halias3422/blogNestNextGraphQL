import { Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/user.model";
import { UserService } from "../user.service";

@Resolver(User)
export class UserQueriesResolver {
    constructor(private userService: UserService) { }

    @Query(() => User)
    async returnOneUser(userId: User['id']) {
        return this.userService.findOne(userId);
    }

    @Query(() => [User])
    async returnAllUsers() {
        return this.userService.findAll();
    }

}