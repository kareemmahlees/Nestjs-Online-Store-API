import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies';
import { JwtGuard } from './guards/jwt.guard';
import { AuthEvents } from './events/auth.events';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, AuthEvents],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    exports: [JwtModule],
})
export class AuthModule {}
