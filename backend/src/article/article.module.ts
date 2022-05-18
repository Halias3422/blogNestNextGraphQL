import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.model';
import { UserModule } from 'src/user/user.module';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationsResolver } from './resolvers/article.mutations.resolver';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article]),  UserModule],
  providers: [ArticleService, ArticleQueriesResolver, ArticleMutationsResolver],
})
export class ArticleModule {}
