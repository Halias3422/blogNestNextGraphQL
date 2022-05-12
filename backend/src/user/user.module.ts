import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';
import { UserQueriesResolver } from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserQueriesResolver, UserMutationsResolver]
})
export class UserModule {}
