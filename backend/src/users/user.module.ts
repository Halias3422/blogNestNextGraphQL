import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import UserMutationsResolver from './resolvers/user.mutations.resolver';
import UserQueriesResolver from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService, UserQueriesResolver, UserMutationsResolver],
    exports: [UserService],
})
export class UsersModule {}
