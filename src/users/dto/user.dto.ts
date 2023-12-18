import { IsDate, IsIn, IsNotEmpty, IsObject } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  // @IsIn(['administrador', 'donante','adoptante'])
  @IsNotEmpty()
  rol: string;
}
