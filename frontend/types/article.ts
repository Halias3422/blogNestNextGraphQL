import { StringValueNode } from 'graphql';
import { Author } from './user';

export type Article = {
	id: string;
	title: string;
	description: string;
	content: string;
	image: string;
	category: string;
	author: Author;
	createdAt: Date;
	updatedAt: Date;
};

export type ArticleForm = {
	authorId: string;
	title: string;
	description: string;
	category: string;
	image: string;
	content: string;
};

export type ArticleUpdateForm = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
} & ArticleForm;
