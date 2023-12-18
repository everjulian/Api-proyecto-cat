
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'tu-secreto-seguro', 
        });
    }

    async validate(payload: any) {
        // Aquí, el payload debería tener 'sub' y 'email'
        const user = await this.authService.validateUser(payload.email, payload.password);

        if (!user) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        return user;
    }
    
}
