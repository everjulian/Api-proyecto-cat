import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { UptadeUserDTO } from "./dto/update-user.dto";

import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UserService {
    // findByEmailAndPassword(email: string, password: string ): Promise<UserEntity> {
    //     throw new Error('Method not implemented.');
    // }
    async findByEmailAndPassword(email: string, password: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOne({ where: { email, password } });
        return user;
    }

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private readonly mailerService: MailerService,
    ) { }
    async find() {
        const users = await this.userRepository.find();
        return users
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        if (!user) {
            throw new NotFoundException({ message: 'Usuario no encontrado', error: 'No se ha encontrado' });
        }
        return user
    }

    create(payload: UserDTO) {
        const newUser = this.userRepository.create();
        newUser.name = payload.name;
        newUser.lastname = payload.lastname;
        newUser.email = payload.email;
        newUser.password = payload.password;
        newUser.rol = payload.rol;

        const response = this.userRepository.save(newUser);

        return response
    }


    async update(id: number, payload: UptadeUserDTO) {
        const User = await this.findOne(id);
        User.name = payload.name;
        User.lastname = payload.lastname;
        User.email = payload.email;
        User.password = payload.password;
        User.rol = payload.rol;
        
        if (!User) {
            throw new NotFoundException({ message: 'Usuario no encontrado', error: 'No encontrado' });
        }
        const response = await this.userRepository.update(id, User);
        return response
    }



    async delete(id: number) {
        //const Book= await this.findOne(id)
        const User = await this.findOne(id);
        if (!User) {
            throw new NotFoundException({ message: 'Usuario no encontrado', error: 'No encontrado' });
        }
        const response = await this.userRepository.delete(id);

        return response
    }

    async generateResetToken(user: UserEntity): Promise<string> {
        const resetToken = uuidv4(); // Utiliza uuidv4 para generar un UUID válido
        user.resetToken = resetToken;
        await this.userRepository.save(user);
        return resetToken;
    }


    async sendResetEmail(user: UserEntity): Promise<void> {
        const resetToken = await this.generateResetToken(user);

        // En tu función sendResetEmail
        const resetLink = `http://localhost:4200/auth/reset?token=${resetToken}`;


        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Solicitud de Restablecimiento de Contraseña',
            template: './reset-password',  // Archivo de plantilla Handlebars (templates/reset-password.hbs)
            context: {
                resetLink,
            },
        });
    }


    async resetPassword(token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { resetToken: token } });
        if (!user) {
            // Manejar el caso en que el token no sea válido
            // Puedes lanzar una excepción o manejar de otra manera
            // Por ejemplo: throw new NotFoundException('Token no válido');
        }

        // Lógica para validar el token y actualizar la contraseña
        // También deberías borrar el token después de que se haya utilizado
        user.resetToken = null;
        user.password = newPassword;
        await this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }


}