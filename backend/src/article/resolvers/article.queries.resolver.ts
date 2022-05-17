import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private articleService: ArticleService) {}

  @Query(() => Article)
  async returnOneArticle(
    @Args({ name: 'id', type: () => ID }) articleId: Article['id'],
  ): Promise<Article> {
    return this.articleService.findOne(articleId);
  }

  @Query(() => [Article])
  async returnAllArticles(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello coco!';
  }
}
