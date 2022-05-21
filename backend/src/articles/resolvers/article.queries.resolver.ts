import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../articles.service';
import ArticleOutput from '../dtos/article.object.dto';
import { ArticleEntity } from '../model/article.entity';

@Resolver(ArticleEntity)
export default class ArticleQueryResolver {
    constructor(private readonly articleService: ArticleService) {}

    @Query(() => ArticleOutput)
    async findOneArticleById(
        @Args({ name: 'id', type: () => ID })
        articleId: string,
    ): Promise<ArticleOutput> {
        return await this.articleService.findOneArticleById(articleId);
    }

    @Query(() => [ArticleOutput])
    async findAllArticles(): Promise<ArticleOutput[]> {
        return await this.articleService.findAllArticles();
    }
}
