import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreationInput } from './dto/articleCreate.dto';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    this.initiateDBContentIfEmpty();
  }

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

  async initiateDBContentIfEmpty() {
    if (await this.checkIfArticleTableIsEmpty()) {
      const newsAPIJson = await this.fetchArticlesFromNewsAPI();
      await this.fillArticleDBWithFetchedData(newsAPIJson);
    } else {
      console.log('Database already filled, no need to fetch Articles');
    }
  }

  async checkIfArticleTableIsEmpty() {
    const articleList: Article[] = await this.findAll();
    if (articleList.length == 0) {
      return true;
    }
    return false;
  }

  async fetchArticlesFromNewsAPI(): Promise<any> {
    const articleType = 'top-headlines';
    const articleCategory = 'technology';
    const country = 'fr';
    const newsAPIFetch = await fetch(
      'https://saurav.tech/NewsAPI/' +
        articleType +
        '/category/' +
        articleCategory +
        '/' +
        country +
        '.json',
    );

    const newsAPIJson = await newsAPIFetch.json();
    return newsAPIJson.articles;
  }

  async fillArticleDBWithFetchedData(articleJson) {
    for (let i = 0; i < articleJson.length; i++) {
      const newArticle: ArticleCreationInput = {
        title: articleJson[i].title,
        description: articleJson[i].description,
        image: articleJson[i].urlToImage,
        content: articleJson[i].content,
        createdAt: articleJson[i].publishedAt,
        lastUpdatedAt: articleJson[i].publishedAt,
      };
      await this.createArticle(newArticle);
    }
    console.log('Articles fetched from newsAPI registered in Database');
    return articleJson;
  }
}
