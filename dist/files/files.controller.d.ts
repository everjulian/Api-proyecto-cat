/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { FilesService } from './files.service';
import { Response } from 'express';
export declare class FilesController {
    private readonly filesService;
    private readonly configService;
    constructor(filesService: FilesService, configService: ConfigService);
    findImgCat(res: Response, imgName: string): void;
    uploadCatImage(file: Express.Multer.File): {
        secureUrl: string;
    };
}
