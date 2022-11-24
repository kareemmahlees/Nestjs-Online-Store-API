import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsDecimal()
    @IsNotEmpty()
    price: number;
}

