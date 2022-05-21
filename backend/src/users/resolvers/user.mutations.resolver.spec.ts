import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserCreationInput from '../dtos/userCreation.dto';
import { UserEntity } from '../model/user.entity';
import { UserService } from '../user.service';
import UserMutationsResolver from './user.mutations.resolver';

describe('UserMutationResolver', () => {
    let userMutationResolver: UserMutationsResolver;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {},
                },
                UserMutationsResolver,
            ],
            exports: [UserService],
        }).compile();

        userMutationResolver = module.get<UserMutationsResolver>(
            UserMutationsResolver,
        );
        userService = module.get<UserService>(UserService);
    });

    const userInput: UserCreationInput = {
        login: 'didier',
        password: '123',
    };

    it('should be defined', () => {
        expect(userMutationResolver).toBeDefined();
    });

    describe('createNewUser', () => {
        it('should be defined', () => {
            expect(userMutationResolver.createNewUser).toBeDefined();
        });

        it('should return true if the user was created', async () => {
            jest.spyOn(userService, 'createNewUser').mockReturnValueOnce(
                Promise.resolve(true),
            );
            expect(
                await userMutationResolver.createNewUser(userInput),
            ).toBeTruthy();
        });

        it('should return false if the user was not created', async () => {
            jest.spyOn(userService, 'deleteOneUserById').mockReturnValueOnce(
                Promise.resolve(false),
            );
            expect(
                await userMutationResolver.deleteOneUserById('1234'),
            ).toBeFalsy();
        });
    });

    describe('deleteOneUserByid', () => {
        it('should be defined', () => {
            expect(userMutationResolver.deleteOneUserById).toBeDefined();
        });

        it('should return true if the user was deleted', async () => {
            jest.spyOn(userService, 'deleteOneUserById').mockReturnValueOnce(
                Promise.resolve(true),
            );
            expect(
                await userMutationResolver.deleteOneUserById('1234'),
            ).toBeTruthy();
        });

        it('should return false if the user was not deleted', async () => {
            jest.spyOn(userService, 'deleteOneUserById').mockReturnValueOnce(
                Promise.resolve(false),
            );
            expect(
                await userMutationResolver.deleteOneUserById('1234'),
            ).toBeFalsy();
        });
    });
});
