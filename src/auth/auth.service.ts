import { Injectable, UsePipes, Body } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { AuthPipe } from './pipes/auth.pipe';
import { RegisterUserDTO, UpdateProfile } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async registerUser(
        userRegisterData: RegisterUserDTO,
    ): Promise<{ user: Prisma.UserCreateInput; access_token: string }> {
        try {
            const createdUser = await this.prisma.user.create({
                data: userRegisterData,
            });
            delete createdUser.password;
            const token = this.jwtService.sign({
                sub: createdUser.id,
                role: createdUser.role,
            });
            this.eventEmitter.emit('user.created', createdUser.email);
            return { user: createdUser, access_token: token };
        } catch (e) {
            console.log(e);

            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new BadRequestException(
                        `${e.meta.target[0]} already exists`,
                    );
                }
            }
        }
    }

    async loginUser(user: any) {
        const payload = { sub: user.id, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async updateProfile(
        userId: string,
        data: UpdateProfile,
    ): Promise<Prisma.UserUpdateInput> {
        const updatedUser = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: data,
        });
        return updatedUser;
    }

    async deleteUserAccount(userId: string) {
        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
}
