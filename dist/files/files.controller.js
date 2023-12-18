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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const files_service_1 = require("./files.service");
const helpers_1 = require("./helpers");
let FilesController = class FilesController {
    constructor(filesService, configService) {
        this.filesService = filesService;
        this.configService = configService;
    }
    findImgCat(res, imgName) {
        const path = this.filesService.findCatImagesByParameter(imgName);
        res.sendFile(path);
    }
    uploadCatImage(file) {
        if (!file)
            throw new common_1.BadRequestException("Please upload the picture or gif of the kitten; it can't be left empty.");
        const secureUrl = `${this.configService.get('HOST_NAME')}/files/cat/${file.filename}`;
        return { secureUrl };
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Get)('cat/:imgName'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('imgName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "findImgCat", null);
__decorate([
    (0, common_1.Post)('cat'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: helpers_1.fileFilter,
        storage: (0, multer_1.diskStorage)({
            destination: './img/uploads',
            filename: helpers_1.fileNamer,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadCatImage", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        config_1.ConfigService])
], FilesController);
//# sourceMappingURL=files.controller.js.map