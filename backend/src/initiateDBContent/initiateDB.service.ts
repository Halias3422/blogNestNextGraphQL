import { Injectable } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';

import { randomBytes } from 'crypto';
import { exit } from 'process';
import { ArticleService } from '../articles/articles.service';
import ArticleOutput from '../articles/dtos/article.object.dto';
import { ArticleCreationPublicInput } from '../articles/dtos/articleCreation.input.dto';
import { UserEntity } from '../users/model/user.entity';
import { UserService } from '../users/user.service';

const CATEGORIES_ARTICLES = [
	'business',
	'entertainment',
	'general',
	'health',
	'science',
	'sports',
	'technology'
];

@Injectable()
export class InitiateDBService {
	constructor(
		private readonly articleService: ArticleService,
		private readonly userService: UserService
	) {
		this.initiateDBContentIfEmpty();
	}

	async initiateDBContentIfEmpty() {
		if (await this.checkIfArticleTableIsEmpty()) {
			const newsAPIJsonDict = await this.fetchArticlesFromNewsAPI();
			await this.fillArticleDBWithFetchedData(newsAPIJsonDict);
		} else {
			console.log('Database already filled, no need to fetch Articles');
		}
	}

	async checkIfArticleTableIsEmpty() {
		const articleList: ArticleOutput[] =
			await this.articleService.findAllArticles();
		if (articleList.length == 0) {
			return true;
		}
		return false;
	}

	async fetchArticlesFromNewsAPI(): Promise<any> {
		const newsAPIJson = {};
		for (let x = 0; x < CATEGORIES_ARTICLES.length; x++) {
			const articleType = 'top-headlines';
			const articleCategory = CATEGORIES_ARTICLES[x];
			const country = 'us';
			const newsAPIFetch = await fetch(
				'https://saurav.tech/NewsAPI/' +
					articleType +
					'/category/' +
					articleCategory +
					'/' +
					country +
					'.json'
			);
			newsAPIJson[CATEGORIES_ARTICLES[x]] = (
				await newsAPIFetch.json()
			).articles;
		}
		return newsAPIJson;
	}

	async createNewsAPIFakeUser() {
		const fakeUser: UserEntity = {
			login: 'newsAPI',
			salt: randomBytes(16).toString('hex'),
			password: 'newsAPI',
			articlesPublished: []
		};
		fakeUser.password = this.userService.hashNewUserPassword(
			fakeUser.password,
			fakeUser.salt
		);
		const createdStatus = await this.userService.createNewUser(fakeUser);
		if (createdStatus) {
			return fakeUser;
		}
		return null;
	}
	checkIfArticleIsValid(article) {
		if (
			!article.title ||
			!article.description ||
			!article.urlToImage ||
			!article.content
		) {
			return false;
		}
		return true;
	}

	async getFakeAuthorForNewsAPI() {
		let authorOutput = await this.userService.findOneUserByLogin('newsAPI');
		if (authorOutput === undefined) {
			const authorNewsAPI: UserEntity =
				await this.createNewsAPIFakeUser();
			if (authorNewsAPI) {
				authorOutput = await this.userService.findOneUserByLogin(
					authorNewsAPI.login
				);
			}
		}
		return authorOutput;
	}

	async fillArticleDBWithFetchedData(articleJsonDict) {
		const authorOutput = await this.getFakeAuthorForNewsAPI();
		Object.entries(articleJsonDict).forEach(([category, articles]) => {
			(articles as any[]).forEach(async (article) => {
				if (this.checkIfArticleIsValid(article)) {
					const newArticle: ArticleCreationPublicInput = {
						title: article.title,
						description: article.description,
						image: article.urlToImage,
						content: article.content,
						authorId: authorOutput.id,
						category: category
					};
					console.log('NEW ARTICLE', newArticle);
					await this.articleService.createNewArticle(newArticle);
				}
			});
		});
		console.log('Articles fetched from newsAPI registered in Database');
	}
}
