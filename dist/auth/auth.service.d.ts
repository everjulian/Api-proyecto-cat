import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    generateToken(user: any, rol: string): Promise<string>;
}
