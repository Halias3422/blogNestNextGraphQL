import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../../articles/model/article.entity';

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    login: string;

    @Column()
    @Generated('uuid')
    salt: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt?: Date;

    @OneToMany(
        () => ArticleEntity,
        (article: ArticleEntity) => article.author,
        { nullable: true },
    )
    articlesPublished: ArticleEntity[];
}
