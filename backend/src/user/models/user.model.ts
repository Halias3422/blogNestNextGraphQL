import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ArticleCreationInput } from "src/article/dto/articleCreate.dto";
import { Article } from "src/article/models/article.model";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@InputType('UserInput')
@Entity('UserEntity')
@ObjectType('UserObject')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    login: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Field(() => Date)
    @Column()
    createdAccountOn: Date;

    @OneToMany('Article', (article: Article) => article.author, { nullable: true})
    articlesCreated: Article[];
}