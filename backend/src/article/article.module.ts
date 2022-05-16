import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  // controllers: [ArticleController],
  providers: [ArticleService, ArticleQueriesResolver, ArticleMutationsResolver],
})
export class ArticleModule {}
