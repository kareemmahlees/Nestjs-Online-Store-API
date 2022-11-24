import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsOptional, IsDecimal, IsNumber } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsDecimal()
    @IsOptional()
    price?: number;
}
