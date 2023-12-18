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
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const uuid_1 = require("uuid");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let CatsService = class CatsService {
    constructor(catRepository, catImageRepository, dataSource) {
        this.catRepository = catRepository;
        this.catImageRepository = catImageRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('CatsService');
    }
    async create(createCatDto) {
        try {
            const { images = [], ...myCats } = createCatDto, cat = this.catRepository.create({
                ...myCats,
                images: images.map((image) => this.catImageRepository.create({ url: image })),
            });
            await this.catRepository.save(cat);
            return { ...cat, images };
        }
        catch (err) {
            this.michisHandleExceptions(err);
        }
    }
    async findAll({ limit = 10, offset = 0 }) {
        const cats = await this.catRepository.find({
            take: limit,
            skip: offset,
            relations: { images: true },
        });
        return cats.map(({ images, ...more }) => ({
            ...more,
            images: images.map((url) => url),
        }));
    }
    async findOne(term) {
        let cat;
        if ((0, uuid_1.validate)(term)) {
            cat = await this.catRepository.findOneBy({ id: term });
        }
        else {
            const query = this.catRepository.createQueryBuilder('minino');
            cat = await query
                .where('LOWER(gender) =:gender or LOWER(size) =:size or LOWER(breed) =:breed', {
                gender: term.toLowerCase(),
                size: term.toLowerCase(),
                breed: term.toLowerCase(),
            })
                .leftJoinAndSelect('minino.images', 'mycat')
                .getOne();
        }
        if (!cat)
            throw new common_1.NotFoundException(`Cat with ${term} not found`);
        return cat;
    }
    async findOnePlain(term) {
        const { images = [], ...more } = await this.findOne(term);
        return { ...more, images: images.map((url) => url) };
    }
    async update(id, updatecatdto) {
        const { images, ...toUpdate } = updatecatdto, cat = await this.catRepository.preload({ id, ...toUpdate });
        if (!cat)
            throw new common_1.NotFoundException(`I can't find this kitten with id ${id}...🐈`);
        const query = this.dataSource.createQueryRunner();
        await query.connect();
        await query.startTransaction();
        try {
            if (images) {
                await query.manager.delete(entities_1.CatsWallpapers, { purrfectpics: { id } });
                cat.images = images.map((url) => this.catImageRepository.create({ url }));
            }
            await query.manager.save(cat);
            await query.commitTransaction();
            await query.release();
            return this.findOnePlain(id);
        }
        catch (err) {
            await query.rollbackTransaction();
            await query.release();
            this.michisHandleExceptions(err);
        }
    }
    async remove(id) {
        const cat = await this.findOne(id);
        await this.catRepository.remove(cat);
    }
    michisHandleExceptions(err) {
        if (err.code === '500')
            throw new common_1.BadRequestException(err.detail);
        this.logger.error(err);
        throw new common_1.InternalServerErrorException('🙈Unexpected error, please verify your code or logs😾');
    }
    async PurrPurge() {
        const query = this.catRepository.createQueryBuilder();
        try {
            return await query.delete().where({}).execute();
        }
        catch (err) {
            this.michisHandleExceptions(err);
        }
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Cat)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CatsWallpapers)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], CatsService);
//# sourceMappingURL=cats.service.js.map