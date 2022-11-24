import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { AbilityModule } from './ability/ability.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        EventEmitterModule.forRoot({}),
        // AbilityModule,
        ProductModule,
        PaymentModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {}
