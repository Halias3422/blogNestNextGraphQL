import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../users/model/user.entity';
import { UserService } from '../../users/user.service';
import { ArticleService } from '../articles.service';
import { ArticleCreationPublicInput } from '../dtos/articleCreation.input.dto';
import { ArticleEntity } from '../model/article.entity';
import ArticleMutationResolver from './article.mutations.resolver';

describe('ArticleMutationResolver', () => {
    let articleService: ArticleService;
    let articleMutationResolver: ArticleMutationResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleService,
                {
                    provide: getRepositoryToken(ArticleEntity),
                    useValue: {},
                },
                ArticleMutationResolver,
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {},
                },
            ],
        }).compile();

        articleService = module.get<ArticleService>(ArticleService);
        articleMutationResolver = module.get<ArticleMutationResolver>(
            ArticleMutationResolver,
        );
    });

    const articlePublicInput: ArticleCreationPublicInput = {
        title: 'titre article',
        description: 'description article',
        content: 'content article',
        image: 'src/image.png',
        authorId: '1234',
    };

    it('should be defined', () => {
        expect(articleMutationResolver).toBeDefined();
    });

    describe('createNewArticle', () => {
        it('should be defined', () => {
            expect(articleMutationResolver.createNewArticle).toBeDefined();
        });

        it('should return true if the article was created', async () => {
            jest.spyOn(articleService, 'createNewArticle').mockReturnValueOnce(
                Promise.resolve(true),
            );
            expect(
                await articleMutationResolver.createNewArticle(
                    articlePublicInput,
                ),
            ).toBeTruthy();
        });

        it('should return false if the article was not created', async () => {
            jest.spyOn(articleService, 'createNewArticle').mockReturnValueOnce(
                Promise.resolve(false),
            );
            expect(
                await articleMutationResolver.createNewArticle(
                    articlePublicInput,
                ),
            ).toBeFalsy();
        });
    });

    describe('deleteOneArticleById', () => {
        it('should be defined', () => {
            expect(articleMutationResolver.deleteOneArticleById).toBeDefined();
        });

        it('should return true if the article was deleted', async () => {
            jest.spyOn(
                articleService,
                'deleteOneArticleById',
            ).mockReturnValueOnce(Promise.resolve(true));
            expect(
                await articleMutationResolver.deleteOneArticleById('123456'),
            ).toBeTruthy();
        });

        it('should return false if the article was not deleted', async () => {
            jest.spyOn(
                articleService,
                'deleteOneArticleById',
            ).mockReturnValueOnce(Promise.resolve(false));
            expect(
                await articleMutationResolver.deleteOneArticleById('123456'),
            ).toBeFalsy();
        });
    });
});
