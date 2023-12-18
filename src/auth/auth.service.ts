
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('Validating user with email:', email);
    
    const user = await this.userService.findByEmailAndPassword(email, password);

    console.log('User found:', user);

    if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas');
    }

    return user;
}

async generateToken(user: any, rol: string): Promise<string> {
  const payload = { sub: user.id, email: user.email, rol }; // Incluye el rol en el payload
  return this.jwtService.sign(payload, { expiresIn: '1d' });
}
}
