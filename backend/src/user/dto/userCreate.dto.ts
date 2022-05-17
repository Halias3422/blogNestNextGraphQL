import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
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

  // @Field(() => [Article], {nullable: true})
  // articlesCreated?: Article[];
}

@ObjectType()
export class UserCreationOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
