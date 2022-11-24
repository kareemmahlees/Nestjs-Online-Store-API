import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AssignedRoles } from 'src/roles/roles.enum';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @Roles(AssignedRoles.Admin)
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto);
    }

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.productService.findOne(id);
    }

    @Put(':id')
    @Roles(AssignedRoles.Admin)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    @Roles(AssignedRoles.Admin)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.productService.remove(id);
        return '';
    }
}
