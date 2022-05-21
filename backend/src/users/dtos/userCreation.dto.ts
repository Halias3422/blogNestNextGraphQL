import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserCreationInput {
    @Field(() => String)
    login: string;

    @Field(() => String)
    password: string;
}

