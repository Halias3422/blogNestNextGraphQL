import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { ArticleEntity } from './articles/model/article.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/model/user.entity';
import { InitiateDBService } from './initiateDBContent/initiateDB.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: parseInt(configService.get('DB_PORT')),
                database: configService.get('DB_NAME'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                entities: [UserEntity, ArticleEntity],
                synchronize: true,
            }),
        }),
        ArticlesModule,
        UsersModule,
    ],
    providers: [AppService, InitiateDBService],
})
export class AppModule {}
