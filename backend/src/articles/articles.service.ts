import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/model/user.entity';
import { UserService } from '../users/user.service';
import ArticleOutput from './dtos/article.object.dto';
import {
	ArticleCreationPrivateInput,
	ArticleCreationPublicInput
} from './dtos/articleCreation.input.dto';
import { ArticleEntity } from './model/article.entity';

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(ArticleEntity)
		private readonly articleRepository: Repository<ArticleEntity>,
		private readonly userService: UserService
	) {}

	fromSingleArticleEntityToArticleOutput(
		articleEntity: ArticleEntity
	): ArticleOutput {
		const authorOutput = this.userService.fromUserEntityToUserOutput(
			articleEntity.author
		);
		const articleOutput: ArticleOutput = {
			id: articleEntity.id,
			title: articleEntity.title,
			description: articleEntity.description,
			content: articleEntity.content,
			image: articleEntity.image,
			category: articleEntity.category,
			author: {
				id: authorOutput.id,
				login: authorOutput.login
			},
			createdAt: articleEntity.createdAt,
			updatedAt: articleEntity.updatedAt
		};
		return articleOutput;
	}

	async findOneArticleById(articleId: string): Promise<ArticleOutput> {
		const articleEntity = await this.articleRepository.findOne({
			where: {
				id: articleId
			}
		});
		if (articleEntity !== undefined) {
			return this.fromSingleArticleEntityToArticleOutput(articleEntity);
		}
		return undefined;
	}

	async findAllArticles(): Promise<ArticleOutput[]> {
		const articleEntities = await this.articleRepository
			.createQueryBuilder('article')
			.innerJoinAndSelect('article.author', 'author')
			.getMany();
		const articleOutputs: ArticleOutput[] = [];
		articleEntities.map((article) => {
			articleOutputs.push(
				this.fromSingleArticleEntityToArticleOutput(article)
			);
		});
		return articleOutputs;
	}

	createArticlePrivateInputFromPublicInput(
		newArticle: ArticleCreationPublicInput,
		author: UserEntity
	) {
		const privateArticle: ArticleCreationPrivateInput = {
			title: newArticle.title,
			description: newArticle.description,
			content: newArticle.content,
			image: newArticle.image,
			category: newArticle.category,
			author: author
		};
		return privateArticle;
	}

	async createNewArticle(
		newArticle: ArticleCreationPublicInput
	): Promise<ArticleOutput> {
		const author = await this.userService.findOneUserEntityById(
			newArticle.authorId
		);
		if (author !== undefined) {
			const privateArticle =
				this.createArticlePrivateInputFromPublicInput(
					newArticle,
					author
				);
			const articleSaved = this.articleRepository.create(privateArticle);
			await this.articleRepository.save(articleSaved);
			const articleOutput = this.findOneArticleById(articleSaved.id);
			return articleOutput;
		}
		return <ArticleOutput>{};
	}

	async deleteOneArticleById(articleId: string): Promise<boolean> {
		const deleted = await this.articleRepository.delete(articleId);
		if (deleted.affected === 1) {
			return true;
		}
		return false;
	}
}
