
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID() 
    token: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
