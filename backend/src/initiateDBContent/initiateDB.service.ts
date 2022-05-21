import { Injectable } from "@nestjs/common";

import { randomBytes } from "crypto";
import { ArticleService } from "../articles/articles.service";
import ArticleOutput from "../articles/dtos/article.object.dto";
import { ArticleCreationPublicInput } from "../articles/dtos/articleCreation.input.dto";
import { UserEntity } from "../users/model/user.entity";
import { UserService } from "../users/user.service";

@Injectable()
export class InitiateDBService {
    constructor(
        private readonly articleService: ArticleService,
        private readonly userService: UserService) {
        this.initiateDBContentIfEmpty()
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
        const articleList: ArticleOutput[] = await this.articleService.findAllArticles();
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

    async createNewsAPIFakeUser() {
        const fakeUser: UserEntity = {
            login: 'newsAPI',
            salt: randomBytes(16).toString('hex'),
            password: 'newsAPI',
            articlesPublished: [],
        }
        fakeUser.password = this.userService.hashNewUserPassword(fakeUser.password, fakeUser.salt);
        const createdStatus = await this.userService.createNewUser(fakeUser);
        if (createdStatus) {
            return fakeUser;
        }
        return null;
    }

    async fillArticleDBWithFetchedData(articleJson) {
        let authorOutput = await this.userService.findOneUserByLogin('newsAPI');
        if (authorOutput === undefined) {
            const authorNewsAPI: UserEntity = await this.createNewsAPIFakeUser();
            if (authorNewsAPI) {
                authorOutput = await this.userService.findOneUserByLogin(authorNewsAPI.login);
            }
        }
        for (let i = 0; i < articleJson.length; i++) {
            const newArticle: ArticleCreationPublicInput = {
                title: articleJson[i].title,
                description: articleJson[i].description,
                image: articleJson[i].urlToImage,
                content: articleJson[i].content,
                authorId: authorOutput.id,
            };
            await this.articleService.createNewArticle(newArticle);
        }
        console.log('Articles fetched from newsAPI registered in Database');
        return articleJson;
    }
}