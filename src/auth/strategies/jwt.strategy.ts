import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport/dist';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }
    async validate(payload: any) {
        const user = this.prisma.user.findUnique({
            where: {
                id: payload.id,
            },
        });
        if (!user) throw new NotFoundException('User record not found');
        return { id: payload.sub, role: payload.role };
    }
}
