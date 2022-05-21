import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ArticleOutput from '../articles/dtos/article.object.dto';
import { ArticleEntity } from '../articles/model/article.entity';
import { AuthorOutput, UserOutput } from './dtos/user.object.dto';
import UserCreationInput from './dtos/userCreation.dto';
import { UserEntity } from './model/user.entity';
import UserMutationsResolver from './resolvers/user.mutations.resolver';
import UserQueriesResolver from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        delete: jest.fn(),
                        getMany: jest.fn(),
                        createQueryBuilder: jest.fn(),
                        innerJoinAndSelect: jest.fn(),
                    },
                },
                UserQueriesResolver,
                UserMutationsResolver,
            ],
            exports: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('userRepository should be defined', () => {
        expect(userRepository).toBeDefined();
    });

    const userEntity: UserEntity = {
        id: '1234',
        login: 'didier',
        salt: '123',
        password: 'password',
        createdAt: new Date(),
        articlesPublished: [],
    };

    const articleEntity: ArticleEntity = {
        id: '123456',
        title: 'titre article',
        description: 'description',
        content: 'content',
        image: 'src/image.png',
        author: userEntity,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    userEntity.articlesPublished = [articleEntity];

    const userOutput: UserOutput = {
        id: '1234',
        login: 'didier',
        createdAt: new Date(),
        articlesPublished: [],
    };

    const authorOutput: AuthorOutput = {
        id: '1234',
        login: 'didier',
    };

    const articleOutput: ArticleOutput = {
        id: '123456',
        title: 'titre article',
        description: 'description',
        content: 'content',
        image: 'src/image.png',
        author: authorOutput,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    userOutput.articlesPublished = [articleOutput];

    const userInput: UserCreationInput = {
        login: 'didier',
        password: '123',
    };

    describe('findOneUserById', () => {
        it('findOneUserById should be defined', () => {
            expect(userService.findOneUserById).toBeDefined();
        });

        it('should call findOne with userId', async () => {
            jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            await userService.findOneUserById('1234');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: '1234' },
            });
        });

        it('should return a valid UserOutput', async () => {
            jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            expect(await userService.findOneUserById('1234')).toEqual(
                userOutput,
            );
        });
    });

    describe('fromUserEntityToUserOutput', () => {
        it('should be defined', () => {
            expect(userService.fromUserEntityToUserOutput).toBeDefined();
        });

        it('should return the userOutput form of the userEntity provided', () => {
            expect(userService.fromUserEntityToUserOutput(userEntity)).toEqual(
                userOutput,
            );
        });
    });

    describe('fromArticleEntityToArticleOutput', () => {
        it('should be defined', () => {
            expect(
                userService.fromArticlePublishedEntityToArticlePublishedOutput,
            ).toBeDefined();
        });

        it('should return the articleOutput of the articleEntity provided', () => {
            expect(
                userService.fromArticlePublishedEntityToArticlePublishedOutput(
                    [articleEntity],
                    userOutput,
                ),
            ).toEqual([articleOutput]);
        });
    });

    describe('findOneUserEntityById', () => {
        it('findOneUserEntityById should be defined', () => {
            expect(userService.findOneUserEntityById).toBeDefined();
        });

        it('should call findOne with userId', async () => {
            await userService.findOneUserEntityById('123');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: '123' },
            });
        });

        it('should return a valid UserOutput', async () => {
            jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            expect(await userService.findOneUserEntityById('123')).toEqual(
                userEntity,
            );
        });
    });

    describe('findOneUserByLogin', () => {
        it('should be defined', () => {
            expect(userService.findOneUserByLogin).toBeDefined();
        });

        it('should call findOne with userLogin', async () => {
            jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            await userService.findOneUserByLogin('didier');
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { login: 'didier' },
            });
        });
        it('should return a valid UserOutput', async () => {
            jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            expect(await userService.findOneUserByLogin('didier')).toEqual(
                userOutput,
            );
        });
    });

    describe('findAllUsers', () => {
        it('should be defined', () => {
            expect(userService.findAllUsers).toBeDefined();
        });

        const createQueryBuilder: any = {
            innerJoinAndSelect: () => createQueryBuilder,
            getMany: () => [userEntity],
        };

        it('should return a valid UserOutput array', async () => {
            jest.spyOn(userRepository, 'createQueryBuilder').mockImplementation(
                () => createQueryBuilder,
            );
            expect(await userService.findAllUsers()).toEqual([userOutput]);
        });
    });

    describe('createNewUser', () => {
        it('should be defined', () => {
            expect(userService.createNewUser).toBeDefined();
        });

        it('should have called findOneByLoginWith newUser.login', async () => {
            jest.spyOn(userService, 'findOneUserByLogin').mockResolvedValueOnce(
                Promise.resolve(userEntity),
            );
            await userService.createNewUser(userInput);
            expect(userService.findOneUserByLogin).toHaveBeenCalledWith(
                'didier',
            );
        });

        it('should have called repository.create with newUser', async () => {
            jest.spyOn(userService, 'findOneUserByLogin').mockResolvedValueOnce(
                Promise.resolve(undefined),
            );
            jest.spyOn(userRepository, 'create');
            await userService.createNewUser(userInput);
            expect(userRepository.create).toHaveBeenCalledWith(userInput);
        });

        it('should have called repository.save with return value of create', async () => {
            jest.spyOn(userService, 'findOneUserByLogin').mockResolvedValueOnce(
                Promise.resolve(undefined),
            );
            jest.spyOn(userRepository, 'create').mockReturnValueOnce(
                userEntity,
            );
            jest.spyOn(userRepository, 'save');
            await userService.createNewUser(userInput);
            expect(userRepository.save).toHaveBeenCalledWith(userEntity);
        });

        it('should have returned true if new user created', async () => {
            jest.spyOn(userService, 'findOneUserByLogin').mockReturnValueOnce(
                undefined,
            );
            jest.spyOn(userRepository, 'create').mockReturnValueOnce(
                userEntity,
            );
            jest.spyOn(userRepository, 'save').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            expect(await userService.createNewUser(userInput)).toBeTruthy();
        });

        it('should have returned false if new user not created', async () => {
            jest.spyOn(userService, 'findOneUserByLogin').mockReturnValueOnce(
                Promise.resolve(userEntity),
            );
            expect(await userService.createNewUser(userInput)).toBeFalsy();
        });
    });

    describe('deleteOneUserById', () => {
        it('should be defined', () => {
            expect(userService.deleteOneUserById).toBeDefined();
        });

        it('should have called repository.delete with userId', async () => {
            jest.spyOn(userRepository, 'delete').mockReturnValueOnce(
                Promise.resolve({
                    raw: null,
                    affected: 1,
                }),
            );
            await userService.deleteOneUserById('1234');
            expect(userRepository.delete).toHaveBeenCalledWith('1234');
        });

        it('should return true if user exists and was deleted', async () => {
            jest.spyOn(userRepository, 'delete').mockReturnValueOnce(
                Promise.resolve({
                    raw: null,
                    affected: 1,
                }),
            );
            expect(await userService.deleteOneUserById('1234')).toBeTruthy();
        });

        it("should return false if user doesn't exist", async () => {
            jest.spyOn(userRepository, 'delete').mockReturnValueOnce(
                Promise.resolve({
                    raw: null,
                    affected: 0,
                }),
            );
            expect(await userService.deleteOneUserById('1234')).toBeFalsy();
        });
    });
});
