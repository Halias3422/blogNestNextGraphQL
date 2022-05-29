import { Field, ID, InputType } from '@nestjs/graphql';
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
	category: string;

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

	@Field(() => String)
	category: string;

	@Field(() => UserEntity)
	author: UserEntity;
}

@InputType()
export class ArticleUpdatePublicInput extends ArticleCreationPublicInput {
	@Field(() => ID)
	id: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}

@InputType()
export class ArticleUpdatePrivateInput extends ArticleCreationPrivateInput {
	@Field(() => ID)
	id: string;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
