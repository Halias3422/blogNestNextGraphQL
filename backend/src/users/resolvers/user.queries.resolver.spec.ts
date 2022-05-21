import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserOutput } from '../dtos/user.object.dto';
import { UserEntity } from '../model/user.entity';
import { UserService } from '../user.service';
import UserQueriesResolver from './user.queries.resolver';

describe('UserQueryResolver', () => {
    let userQueryResolver: UserQueriesResolver;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {},
                },
                UserQueriesResolver,
            ],
            exports: [UserService],
        }).compile();

        userQueryResolver =
            module.get<UserQueriesResolver>(UserQueriesResolver);
        userService = module.get<UserService>(UserService);
    });

    it('userQueryResolver should be defined', () => {
        expect(userQueryResolver).toBeDefined();
    });

    const userOutput: UserOutput = {
        id: '1234',
        login: 'didier',
        createdAt: new Date(),
        articlesPublished: [],
    };

    describe('findOneUserById', () => {
        it('should be defined', () => {
            expect(userQueryResolver.findOneUserById).toBeDefined();
        });

        it('should return userService.findOneUserById return value', async () => {
            jest.spyOn(userService, 'findOneUserById').mockReturnValueOnce(
                Promise.resolve(userOutput),
            );
            expect(await userQueryResolver.findOneUserById('1234')).toEqual(
                userOutput,
            );
        });
    });

    describe('findAllUsers', () => {
        it('should be defined', () => {
            expect(userQueryResolver.findAllUsers).toBeDefined();
        });

        it('should return userService.findAllusers return value', async () => {
            jest.spyOn(userService, 'findAllUsers').mockReturnValueOnce(
                Promise.resolve([userOutput]),
            );
            expect(await userQueryResolver.findAllUsers()).toEqual([
                userOutput,
            ]);
        });
    });
});
