"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./users/user.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const dotenv = require("dotenv");
const cats_module_1 = require("./cats/cats.module");
const common_module_1 = require("./common/common.module");
const seed_module_1 = require("./seed/seed.module");
const files_module_1 = require("./files/files.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
            cats_module_1.CatsModule,
            common_module_1.CommonModule,
            seed_module_1.SeedModule,
            files_module_1.FilesModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'CatsDataB',
                autoLoadEntities: true,
                synchronize: true,
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: 'smtp.sendgrid.net',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'apikey',
                            pass: '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',
                        },
                    },
                    defaults: {
                        from: 'everardila35@gmail.com',
                    },
                    template: {
                        dir: process.cwd() + '/templates/',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map