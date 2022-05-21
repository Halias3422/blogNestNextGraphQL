import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../articles.service';
import { ArticleCreationPublicInput } from '../dtos/articleCreation.input.dto';
import { ArticleEntity } from '../model/article.entity';

@Resolver(ArticleEntity)
export default class ArticleMutationResolver {
    constructor(private readonly articleService: ArticleService) {}

    @Mutation(() => Boolean)
    async createNewArticle(
        @Args({ name: 'newArticle', type: () => ArticleCreationPublicInput })
        newArticle: ArticleCreationPublicInput,
    ): Promise<boolean> {
        return await this.articleService.createNewArticle(newArticle);
    }

    @Mutation(() => Boolean)
    async deleteOneArticleById(
        @Args({ name: 'articleId', type: () => ID })
        articleId: string,
    ): Promise<boolean> {
        return await this.articleService.deleteOneArticleById(articleId);
    }
}
