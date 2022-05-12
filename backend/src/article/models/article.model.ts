import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/models/user.model";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Article {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    content: string;

    // @Field(() => User)
    // @ManyToOne(() => User, user => user.articlesCreated)
    // author: User;

    @Field(() => Date)
    @Column()
    createdAt: Date;

    @Field(() => Date)
    @Column()
    lastUpdatedAt: Date;
}
