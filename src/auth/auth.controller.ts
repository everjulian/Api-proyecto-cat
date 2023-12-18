
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from 'src/users/dto/reset-password-dto';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) { }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }): Promise<{ token: string, rol: string }> {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    const token = await this.authService.generateToken(user, user.rol);

    return { token, rol: user.rol };
  }
 
  @Post('send-reset-email')
  async sendResetEmail(@Body() body: { email: string }): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      await this.userService.sendResetEmail(user);
    }
    // Puedes manejar el caso en que el usuario no existe de alguna manera
    // Por ejemplo: throw new NotFoundException('Usuario no encontrado');
  }

  @Post('reset-password')
  async resetPassword(@Body() resetData: ResetPasswordDto): Promise<void> {
    await this.userService.resetPassword(resetData.token, resetData.newPassword);
  }

}
