import { IsString, IsOptional, IsEmail, Length } from "class-validator"

export class UpdateProfile {
    @IsString()
    @Length(10, 15)
    @IsOptional()
    name?: string

    @IsString()
    @IsEmail()
    @IsOptional()
    @Length(10, 255)
    email?: string

    @IsString()
    @Length(8, 20)
    @IsOptional()
    password?: string
}