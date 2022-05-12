import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "../models/user.model";
import { UserService } from "../user.service";
import { UserCreationInput, UserCreationOutput } from "../dto/userCreate.dto";

@Resolver(User)
export class UserMutationsResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserCreationOutput)
    async createUser(@Args('input') input: UserCreationInput) {
        return this.userService.createUser(input);
    }


}