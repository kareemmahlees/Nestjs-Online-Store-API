import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import helmet from 'helmet';
import { PrismaService } from 'src/database/prisma.service';
import { UserModule } from '../user.module';
import { spec } from 'pactum';
import * as pactum from 'pactum';

describe('UserController', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
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

    // it('shoud something', () => {
    //     spec().post('/');
    // });
    it.todo('should from user');
});
