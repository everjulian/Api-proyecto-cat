import { IsDate, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class UptadeUserDTO {

    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    lastname?: string;

    @IsOptional()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsNotEmpty()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    password?: string;


    @IsOptional()
    @IsNotEmpty()
    rol?: string;
}
