import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AbilityModule } from 'src/ability/ability.module';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, JwtGuard, RolesGuard],
    imports: [AbilityModule],
})
export class UserModule {}
