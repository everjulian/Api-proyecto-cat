import { UserService } from "./user.service";
import { UptadeUserDTO } from "./dto/update-user.dto";
import { CreateUserDTO } from "./dto/create-users.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    find(query: any): Promise<import("./user.entity").UserEntity[]>;
    findOne(id: number): Promise<import("./user.entity").UserEntity>;
    create(payload: CreateUserDTO): Promise<import("./user.entity").UserEntity>;
    update(id: number, payload: UptadeUserDTO): Promise<{
        id: number;
        body: UptadeUserDTO;
    }>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
