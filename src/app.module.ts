import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';
import { CatsModule } from './cats/cats.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CatsModule,
    CommonModule,
    SeedModule,
    FilesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'CatsDataB',
      autoLoadEntities: true,
      synchronize: true,
    }),

    MailerModule.forRootAsync({
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
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
