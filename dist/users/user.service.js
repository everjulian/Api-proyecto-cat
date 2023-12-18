"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const uuid_1 = require("uuid");
const mailer_1 = require("@nestjs-modules/mailer");
let UserService = class UserService {
    async findByEmailAndPassword(email, password) {
        const user = await this.userRepository.findOne({ where: { email, password } });
        return user;
    }
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
    }
    async find() {
        const users = await this.userRepository.find();
        return users;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new common_1.NotFoundException({ message: 'Usuario no encontrado', error: 'No se ha encontrado' });
        }
        return user;
    }
    create(payload) {
        const newUser = this.userRepository.create();
        newUser.name = payload.name;
        newUser.lastname = payload.lastname;
        newUser.email = payload.email;
        newUser.password = payload.password;
        newUser.rol = payload.rol;
        const response = this.userRepository.save(newUser);
        return response;
    }
    async update(id, payload) {
        const User = await this.findOne(id);
        User.name = payload.name;
        User.lastname = payload.lastname;
        User.email = payload.email;
        User.password = payload.password;
        User.rol = payload.rol;
        if (!User) {
            throw new common_1.NotFoundException({ message: 'Usuario no encontrado', error: 'No encontrado' });
        }
        const response = await this.userRepository.update(id, User);
        return response;
    }
    async delete(id) {
        const User = await this.findOne(id);
        if (!User) {
            throw new common_1.NotFoundException({ message: 'Usuario no encontrado', error: 'No encontrado' });
        }
        const response = await this.userRepository.delete(id);
        return response;
    }
    async generateResetToken(user) {
        const resetToken = (0, uuid_1.v4)();
        user.resetToken = resetToken;
        await this.userRepository.save(user);
        return resetToken;
    }
    async sendResetEmail(user) {
        const resetToken = await this.generateResetToken(user);
        const resetLink = `http://localhost:4200/auth/reset?token=${resetToken}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Solicitud de Restablecimiento de Contraseña',
            template: './reset-password',
            context: {
                resetLink,
            },
        });
    }
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.findOne({ where: { resetToken: token } });
        if (!user) {
        }
        user.resetToken = null;
        user.password = newPassword;
        await this.userRepository.save(user);
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UserService);
//# sourceMappingURL=user.service.js.map