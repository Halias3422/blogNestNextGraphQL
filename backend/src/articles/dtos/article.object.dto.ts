import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthorOutput } from '../../users/dtos/user.object.dto';

@ObjectType()
export default class ArticleOutput {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    image: string;

    @Field(() => AuthorOutput)
    author: AuthorOutput;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
