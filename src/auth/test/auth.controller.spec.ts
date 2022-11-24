import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import helmet from 'helmet';
import { PrismaService } from 'src/database/prisma.service';
import { AuthModule } from '../auth.module';
import { spec } from 'pactum';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';

describe('AuthController', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        prisma = app.get(PrismaService);
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        app.use(helmet());
        app.enableCors({
            origin: ['*'],
        });
        prisma.cleandb();
        await app.init();
        await app.listen(3333);

        pactum.request.setBaseUrl('http://localhost:3333');
    });
    afterAll(async () => {
        await app.close();
    });

    // it('should register user', () => {
    //     spec()
    //         .post('/auth/register')
    //         .withBody({
    //             name: 'testuser123',
    //             email: 'testuser@gmail.com',
    //             password: 'password123',
    //         })
    //         .expectStatus(201);
    // });

    // it('should login user', () => {
    //     spec()
    //         .post('auth/login')
    //         .withBody({
    //             email: 'testuser@gmail.com',
    //             password: 'password123',
    //         })
    //         .expectStatus(200);
    // });
    it.todo('should do something');
});
