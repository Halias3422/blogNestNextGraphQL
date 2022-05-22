import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorOutput, UserOutput } from '../users/dtos/user.object.dto';
import { UserEntity } from '../users/model/user.entity';
import { UserService } from '../users/user.service';
import { ArticleService } from './articles.service';
import ArticleOutput from './dtos/article.object.dto';
import {
	ArticleCreationPrivateInput,
	ArticleCreationPublicInput
} from './dtos/articleCreation.input.dto';
import { ArticleEntity } from './model/article.entity';
import ArticleMutationResolver from './resolvers/article.mutations.resolver';
import ArticleQueryResolver from './resolvers/article.queries.resolver';

describe('ArticlesService', () => {
	let articleService: ArticleService;
	let userService: UserService;
	let articleRepository: Repository<ArticleEntity>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ArticleService,
				{
					provide: getRepositoryToken(ArticleEntity),
					useValue: {
						findOne: jest.fn(),
						innerJoinAndSelect: jest.fn(),
						getMany: jest.fn(),
						createQueryBuilder: jest.fn(),
						create: jest.fn(),
						save: jest.fn(),
						delete: jest.fn()
					}
				},
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: {}
				},
				ArticleQueryResolver,
				ArticleMutationResolver
			],
			exports: [ArticleService]
		}).compile();

		articleService = module.get<ArticleService>(ArticleService);
		userService = module.get<UserService>(UserService);
		articleRepository = module.get<Repository<ArticleEntity>>(
			getRepositoryToken(ArticleEntity)
		);
	});

	const userEntity: UserEntity = {
		id: '1234',
		login: 'didier',
		salt: '123',
		password: 'password',
		createdAt: new Date(),
		articlesPublished: []
	};

	const articleEntity: ArticleEntity = {
		id: '123456',
		title: 'titre article',
		description: 'description',
		content: 'content',
		category: 'category',
		image: 'src/image.png',
		author: userEntity,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	userEntity.articlesPublished = [articleEntity];

	const userOutput: UserOutput = {
		id: '1234',
		login: 'didier',
		createdAt: new Date(),
		articlesPublished: []
	};

	const authorOutput: AuthorOutput = {
		id: '1234',
		login: 'didier'
	};

	const articleOutput: ArticleOutput = {
		id: '123456',
		title: 'titre article',
		description: 'description',
		content: 'content',
		category: 'category',
		image: 'src/image.png',
		author: authorOutput,
		createdAt: new Date(),
		updatedAt: new Date()
	};

	userOutput.articlesPublished = [articleOutput];

	const articlePublicInput: ArticleCreationPublicInput = {
		title: 'titre article',
		description: 'description article',
		content: 'content article',
		category: 'category',
		image: 'src/image.png',
		authorId: '1234'
	};

	const articlePrivateInput: ArticleCreationPrivateInput = {
		title: 'titre article',
		description: 'description article',
		content: 'content article',
		category: 'category',
		image: 'src/image.png',
		author: userEntity
	};

	describe('fromSingleArticleEntityToArticleOutput', () => {
		it('should be defined', () => {
			expect(
				articleService.fromSingleArticleEntityToArticleOutput
			).toBeDefined();
		});

		it('should return an articleOutput', () => {
			expect(
				articleService.fromSingleArticleEntityToArticleOutput(
					articleEntity
				)
			).toEqual(articleOutput);
		});
	});

	describe('findOneArticleById', () => {
		it('should be defined', () => {
			expect(articleService.findOneArticleById).toBeDefined();
		});

		it('should return an ArticleOutput', async () => {
			jest.spyOn(articleRepository, 'findOne').mockReturnValueOnce(
				Promise.resolve(articleEntity)
			);
			expect(await articleService.findOneArticleById('123456')).toEqual(
				articleOutput
			);
		});
	});

	describe('findAllArticles', () => {
		it('should be defined', () => {
			expect(articleService.findAllArticles).toBeDefined();
		});

		const createQueryBuilder: any = {
			innerJoinAndSelect: () => createQueryBuilder,
			getMany: () => [articleEntity]
		};

		it('should return an array of articleOutput', async () => {
			jest.spyOn(
				articleRepository,
				'createQueryBuilder'
			).mockImplementation(() => createQueryBuilder);
			expect(await articleService.findAllArticles()).toEqual([
				articleOutput
			]);
		});
	});

	describe('createArticlePrivateInputFromPublicInput', () => {
		it('should be defined', () => {
			expect(
				articleService.createArticlePrivateInputFromPublicInput
			).toBeDefined();
		});

		it('should return an ArticleCreationPrivateInput', () => {
			expect(
				articleService.createArticlePrivateInputFromPublicInput(
					articlePublicInput,
					userEntity
				)
			).toEqual(articlePrivateInput);
		});
	});

	describe('createNewArticle', () => {
		it('should be defined', () => {
			expect(articleService.createNewArticle).toBeDefined();
		});

		it('should return true if article was created', async () => {
			jest.spyOn(
				userService,
				'findOneUserEntityById'
			).mockReturnValueOnce(Promise.resolve(userEntity));
			jest.spyOn(articleRepository, 'create').mockReturnValueOnce(
				articleEntity
			);
			jest.spyOn(articleRepository, 'save').mockReturnValueOnce(
				Promise.resolve(articleEntity)
			);
			expect(
				await articleService.createNewArticle(articlePublicInput)
			).toBeTruthy();
		});

		it("should return false if author couldn't be found", async () => {
			jest.spyOn(
				userService,
				'findOneUserEntityById'
			).mockReturnValueOnce(Promise.resolve(undefined));
			expect(
				await articleService.createNewArticle(articlePublicInput)
			).toBeFalsy();
		});
	});

	describe('deleteOneArticleById', () => {
		it('should be defined', () => {
			expect(articleService.deleteOneArticleById).toBeDefined();
		});

		it('should return true if article was deleted', async () => {
			jest.spyOn(articleRepository, 'delete').mockReturnValueOnce(
				Promise.resolve({
					raw: null,
					affected: 1
				})
			);
			expect(
				await articleService.deleteOneArticleById('123456')
			).toBeTruthy();
		});

		it('should return false if article was not found', async () => {
			jest.spyOn(articleRepository, 'delete').mockReturnValueOnce(
				Promise.resolve({
					raw: null,
					affected: 0
				})
			);
			expect(
				await articleService.deleteOneArticleById('123456')
			).toBeFalsy();
		});
	});
});
