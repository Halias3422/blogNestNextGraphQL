import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreationInput, ArticleCreationOutput } from './dto/articleCreate.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

    async findAll() {
        return this.articleRepository.find();
    }
    async findOne(articleId: Article['id']) {
        return this.articleRepository.findOne(articleId);
    }

    async createArticle(input: ArticleCreationInput) {
        input.createdAt = new Date();
        input.lastUpdatedAt = input.createdAt;
        const newArticle = this.articleRepository.create(input);
        const article = await this.articleRepository.save(newArticle);
        return { article };
    }
}
