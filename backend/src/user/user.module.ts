import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { Article } from 'src/article/models/article.model';
import { User } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';
import { UserQueriesResolver } from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ArticleModule)],
    providers: [UserService, UserQueriesResolver, UserMutationsResolver],
    exports: [UserService]
})
export class UserModule {}
