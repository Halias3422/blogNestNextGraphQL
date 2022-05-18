import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { StringValueNode } from 'graphql';
import { Article } from 'src/article/models/article.model';
import { User } from '../models/user.model';

@InputType()
export class UserCreationInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String)
  login: string;

  @Field(() => String, { nullable: true })
  salt?: string;

  @Field(() => String)
  password: string;

  @Field(() => Date, { nullable: true })
  createdAccountOn?: Date;

   @Field(() => [Article], {nullable: true})
   articlesCreated?: Article[];
}

@InputType()
export class Author {
  @Field(() => ID)
  id: string;
}

@ObjectType()
export class UserOutput {
  @Field(() => String, {nullable: true })
  login: string; 

  @Field(() => String, { nullable: true })
  id: string;
}
