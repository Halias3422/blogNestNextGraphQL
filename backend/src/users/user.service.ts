import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import ArticleOutput from '../articles/dtos/article.object.dto';
import { ArticleEntity } from '../articles/model/article.entity';
import { UserOutput } from './dtos/user.object.dto';
import UserCreationInput from './dtos/userCreation.dto';
import { UserEntity } from './model/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly usersRepository: Repository<UserEntity>
	) {}

	fromArticlePublishedEntityToArticlePublishedOutput(
		articleEntity: ArticleEntity[],
		author: UserOutput
	): ArticleOutput[] {
		const articlesPublishedOutput: ArticleOutput[] = [];
		articleEntity.map((article) => {
			const articleOutput: ArticleOutput = {
				id: article.id,
				title: article.title,
				description: article.description,
				content: article.content,
				image: article.image,
				author: {
					id: author.id,
					login: author.login
				},
				createdAt: article.createdAt,
				updatedAt: article.updatedAt
			};
			articlesPublishedOutput.push(articleOutput);
		});
		return articlesPublishedOutput;
	}

	fromUserEntityToUserOutput(userEntity: UserEntity): UserOutput {
		const userOutput: UserOutput = {
			id: userEntity.id,
			login: userEntity.login,
			createdAt: userEntity.createdAt,
			articlesPublished: []
		};
		if (
			userEntity.articlesPublished &&
			userEntity.articlesPublished.length > 0
		) {
			userOutput.articlesPublished =
				this.fromArticlePublishedEntityToArticlePublishedOutput(
					userEntity.articlesPublished,
					userOutput
				);
		}
		return userOutput;
	}

	async findOneUserById(userId: string): Promise<UserOutput> {
		const userEntity = await this.usersRepository.findOne({
			where: {
				id: userId
			}
		});
		if (userEntity !== undefined) {
			return this.fromUserEntityToUserOutput(userEntity);
		}
		return undefined;
	}

	async findOneUserEntityById(userId: string): Promise<UserEntity> {
		const userEntity = await this.usersRepository.findOne({
			where: {
				id: userId
			}
		});
		return userEntity;
	}

	async findOneUserEntityByLogin(login: string): Promise<UserEntity> {
		const userEntity = await this.usersRepository.findOne({
			where: {
				login: login
			}
		});
		return userEntity;
	}

	async findOneUserByLogin(userLogin: string): Promise<UserOutput> {
		const userEntity = await this.usersRepository.findOne({
			where: {
				login: userLogin
			}
		});
		if (userEntity !== undefined) {
			return this.fromUserEntityToUserOutput(userEntity);
		}
		return undefined;
	}

	async findAllUsers(): Promise<UserOutput[]> {
		const userEntities = await this.usersRepository
			.createQueryBuilder('user')
			.innerJoinAndSelect('user.articlesPublished', 'articlePublished')
			.getMany();
		const userOutputs: UserOutput[] = [];
		userEntities.map((userEntity) => {
			const userOutput = this.fromUserEntityToUserOutput(userEntity);
			userOutputs.push(userOutput);
		});
		return userOutputs;
	}

	hashNewUserPassword(password: string, salt: string) {
		const newPassword = pbkdf2Sync(
			password,
			salt,
			1000,
			64,
			'sha512'
		).toString('hex');
		return newPassword;
	}

	fromUserCreationInputToUserEntity(user: UserCreationInput) {
		const newUser: UserEntity = {
			login: user.login,
			salt: randomBytes(16).toString('hex'),
			password: user.password,
			articlesPublished: []
		};
		newUser.password = this.hashNewUserPassword(
			newUser.password,
			newUser.salt
		);
		return newUser;
	}

	async createNewUser(newUser: UserCreationInput): Promise<UserOutput> {
		if ((await this.findOneUserByLogin(newUser.login)) === undefined) {
			const userEntity: UserEntity =
				this.fromUserCreationInputToUserEntity(newUser);
			const userSaved = this.usersRepository.create(userEntity);
			await this.usersRepository.save(userSaved);
			const newUserEntity = await this.findOneUserByLogin(
				userEntity.login
			);
			return newUserEntity;
		}
		return <UserOutput>{};
	}

	async deleteOneUserById(userId: string): Promise<boolean> {
		const deleted = await this.usersRepository.delete(userId);
		if (deleted.affected === 1) {
			return true;
		}
		return false;
	}

	async findOneUserByCredentials(
		login: string,
		password: string
	): Promise<UserOutput> {
		const foundUserInDB = await this.findOneUserEntityByLogin(login);
		if (foundUserInDB !== undefined) {
			const hashedPassword = this.hashNewUserPassword(
				password,
				foundUserInDB.salt
			);
			if (hashedPassword === foundUserInDB.password) {
				return this.fromUserEntityToUserOutput(foundUserInDB);
			}
		}
		return undefined;
	}
}
