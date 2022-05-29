import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../articles.service';
import ArticleOutput from '../dtos/article.object.dto';
import {
	ArticleCreationPublicInput,
	ArticleUpdatePublicInput
} from '../dtos/articleCreation.input.dto';
import { ArticleEntity } from '../model/article.entity';

@Resolver(ArticleEntity)
export default class ArticleMutationResolver {
	constructor(private readonly articleService: ArticleService) {}

	@Mutation(() => ArticleOutput)
	async createNewArticle(
		@Args({ name: 'newArticle', type: () => ArticleCreationPublicInput })
		newArticle: ArticleCreationPublicInput
	): Promise<ArticleOutput> {
		return await this.articleService.createNewArticle(newArticle);
	}

	@Mutation(() => Boolean)
	async deleteOneArticleById(
		@Args({ name: 'articleId', type: () => ID })
		articleId: string
	): Promise<boolean> {
		return await this.articleService.deleteOneArticleById(articleId);
	}

	@Mutation(() => ArticleOutput)
	async updateArticle(
		@Args({
			name: 'articleToUpdate',
			type: () => ArticleUpdatePublicInput
		})
		articleToUpdate: ArticleUpdatePublicInput
	): Promise<ArticleOutput> {
		return await this.articleService.updateArticle(articleToUpdate);
	}
}
