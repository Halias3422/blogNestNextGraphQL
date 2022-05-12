import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ArticleService } from "../article.service";
import { ArticleCreationInput, ArticleCreationOutput } from "../dto/articleCreate.dto";
import { Article } from "../models/article.model";

@Resolver(Article)
export class ArticleMutationsResolver {

    constructor(private readonly articleService: ArticleService) {} 

    @Mutation(() => ArticleCreationOutput)
    async createArticle(@Args('input') input: ArticleCreationInput) {
        return this.articleService.createArticle(input);
    }
}