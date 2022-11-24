import {
    IsString,
    IsEmail,
    IsNotEmpty,
    Length,
    IsBoolean,
    IsOptional,
} from 'class-validator';
import { AssignedRoles } from 'src/roles/roles.enum';

export class RegisterUserDTO {
    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Length(10, 255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;

    @IsString()
    @IsOptional()
    role?;
}
