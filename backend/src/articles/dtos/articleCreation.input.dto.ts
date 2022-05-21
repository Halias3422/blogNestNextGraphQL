import { Field, InputType } from '@nestjs/graphql';
import { UserEntity } from '../../users/model/user.entity';

@InputType()
export class ArticleCreationPublicInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    image: string;

    @Field(() => String)
    authorId: string;
}

@InputType()
export class ArticleCreationPrivateInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    image: string;

    @Field(() => UserEntity)
    author: UserEntity;
}
