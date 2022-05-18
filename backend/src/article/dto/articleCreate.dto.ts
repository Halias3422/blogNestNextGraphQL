import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/user/dto/userCreate.dto';

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

   @Field(() => Author)
   author: Author;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  lastUpdatedAt?: Date;
}

@ObjectType()
export class ArticleCreationOutput {
  @Field(() => Boolean)
  articleCreated: boolean;
}
