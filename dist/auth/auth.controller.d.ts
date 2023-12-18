import { AuthService } from './auth.service';
import { ResetPasswordDto } from 'src/users/dto/reset-password-dto';
import { UserService } from 'src/users/user.service';
export declare class AuthController {
    private readonly authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(credentials: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        rol: string;
    }>;
    sendResetEmail(body: {
        email: string;
    }): Promise<void>;
    resetPassword(resetData: ResetPasswordDto): Promise<void>;
}
