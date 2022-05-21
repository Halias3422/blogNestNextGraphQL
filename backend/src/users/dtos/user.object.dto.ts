import { Field, ID, ObjectType } from '@nestjs/graphql';
import ArticleOutput from '../../articles/dtos/article.object.dto';

@ObjectType()
export class UserOutput {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    login: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => [ArticleOutput], { nullable: true })
    articlesPublished: ArticleOutput[];
}

@ObjectType()
export class AuthorOutput {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    login: string;
}
