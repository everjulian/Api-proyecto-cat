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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const _1 = require(".");
const typeorm_1 = require("typeorm");
let Cat = class Cat {
    catsCheckInserts() {
        this.moniker ??= this.name;
        this.moniker = this.moniker
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
    catsCheckUpdate() {
        this.moniker = this.moniker
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
};
exports.Cat = Cat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Cat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', default: 0 }),
    __metadata("design:type", Number)
], Cat.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "personality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Cat.prototype, "info", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Cat.prototype, "moniker", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.CatsWallpapers, (catsWallpapers) => catsWallpapers.purrfectpics, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Cat.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], Cat.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Cat.prototype, "catsCheckInserts", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Cat.prototype, "catsCheckUpdate", null);
exports.Cat = Cat = __decorate([
    (0, typeorm_1.Entity)()
], Cat);
//# sourceMappingURL=cat.entity.js.map