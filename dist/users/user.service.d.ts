import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { UptadeUserDTO } from "./dto/update-user.dto";
import { MailerService } from "@nestjs-modules/mailer";
export declare class UserService {
    private userRepository;
    private readonly mailerService;
    findByEmailAndPassword(email: string, password: string): Promise<UserEntity | undefined>;
    constructor(userRepository: Repository<UserEntity>, mailerService: MailerService);
    find(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    create(payload: UserDTO): Promise<UserEntity>;
    update(id: number, payload: UptadeUserDTO): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    generateResetToken(user: UserEntity): Promise<string>;
    sendResetEmail(user: UserEntity): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    findByEmail(email: string): Promise<UserEntity | undefined>;
}
