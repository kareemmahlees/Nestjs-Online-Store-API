import { PartialType } from '@nestjs/mapped-types';
import {
    IsEmail,
    IsEnum,
    IsIn,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { AssignedRoles } from 'src/roles/roles.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @IsString()
    @Length(6, 15)
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @IsEnum(AssignedRoles)
    role: AssignedRoles;
}
