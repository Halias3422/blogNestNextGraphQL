import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/user.module';
import { ArticleService } from './articles.service';
import { ArticleEntity } from './model/article.entity';
import ArticleMutationResolver from './resolvers/article.mutations.resolver';
import ArticleQueryResolver from './resolvers/article.queries.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule],
    providers: [ArticleService, ArticleQueryResolver, ArticleMutationResolver],
    exports: [ArticleService],
})
export class ArticlesModule {}
