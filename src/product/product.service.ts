import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Product, Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/prisma.service';
import { Roles } from 'src/roles/roles.decorator';
import { AssignedRoles } from 'src/roles/roles.enum';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}
    create(createProductDto: CreateProductDto): Promise<Product> {
        return this.prismaService.product.create({
            data: createProductDto,
        });
    }

    findAll(): Promise<Product[]> {
        return this.prismaService.product.findMany({});
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.prismaService.product.findFirst({
            where: {
                id,
            },
        });
        if (!product)
            throw new NotFoundException(`Product with id ${id} was not found`);
        return product;
    }

    @Roles(AssignedRoles.Admin)
    async update(
        id: string,
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        try {
            return this.prismaService.product.update({
                where: {
                    id,
                },
                data: updateProductDto,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2018') {
                    throw new NotFoundException(
                        `Product with id ${id} was not found`,
                    );
                }
            }
        }
    }

    @Roles(AssignedRoles.Admin)
    remove(id: string): Promise<Product> {
        try {
            return this.prismaService.product.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2018') {
                    throw new NotFoundException(
                        `Product with id ${id} was not found`,
                    );
                }
            }
        }
    }
}
