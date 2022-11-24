import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AbilityFactory } from 'src/ability/ability.factory';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly abilityFactory: AbilityFactory,
        private readonly prismaService: PrismaService,
    ) {}

    async findAll(): Promise<User[]> {
        const allUsers = await this.prismaService.user.findMany();
        allUsers.forEach((element) => {
            delete element.password;
        });
        return allUsers;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });
        delete user.password;
        return user;
    }

    update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.prismaService.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }

    remove(id: string): Promise<User> {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }
}
