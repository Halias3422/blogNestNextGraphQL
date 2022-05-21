import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorOutput } from '../../users/dtos/user.object.dto';
import { UserEntity } from '../../users/model/user.entity';
import { UserService } from '../../users/user.service';
import { ArticleService } from '../articles.service';
import ArticleOutput from '../dtos/article.object.dto';
import { ArticleEntity } from '../model/article.entity';
import ArticleQueryResolver from './article.queries.resolver';

describe('ArticleQueryResolver', () => {
    let articleService: ArticleService;
    let articleQueryResolver: ArticleQueryResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleService,
                {
                    provide: getRepositoryToken(ArticleEntity),
                    useValue: {},
                },
                ArticleQueryResolver,
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {},
                },
            ],
        }).compile();

        articleService = module.get<ArticleService>(ArticleService);
        articleQueryResolver =
            module.get<ArticleQueryResolver>(ArticleQueryResolver);
    });

    const authorOutput: AuthorOutput = {
        id: '1234',
        login: 'didier',
    };

    const articleOutput: ArticleOutput = {
        id: '123456',
        title: 'titre article',
        description: 'description',
        content: 'content',
        image: 'src/image.png',
        author: authorOutput,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    it('should be defined', () => {
        expect(articleQueryResolver).toBeDefined();
    });

    describe('findOneArticleById', () => {
        it('should return an articleOutput', async () => {
            jest.spyOn(
                articleService,
                'findOneArticleById',
            ).mockReturnValueOnce(Promise.resolve(articleOutput));
            expect(
                await articleQueryResolver.findOneArticleById('123456'),
            ).toEqual(articleOutput);
        });
    });

    describe('findAllArticles', () => {
        it('should be defined', () => {
            expect(articleQueryResolver.findAllArticles).toBeDefined();
        });

        it('should return an array of articleOutput', async () => {
            jest.spyOn(articleService, 'findAllArticles').mockReturnValueOnce(
                Promise.resolve([articleOutput]),
            );
            expect(await articleQueryResolver.findAllArticles()).toEqual([
                articleOutput,
            ]);
        });
    });
});
