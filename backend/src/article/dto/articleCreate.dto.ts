import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../models/article.model';

@InputType()
export class ArticleCreationInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  // @Field(() => User)
  // author?: User;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  lastUpdatedAt?: Date;
}

@ObjectType()
export class ArticleCreationOutput {
  @Field(() => Article)
  article: Article;
}
