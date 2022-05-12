import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/models/article.model";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    login: string;

    @Field(() => Date)
    @Column()
    password: string;

    @Field(() => Date)
    @Column()
    createdAccountOn: Date;

    @Field(() => [Article])
    @OneToMany(() => Article, article => article.id)
    articlesCreated: Article[];
}