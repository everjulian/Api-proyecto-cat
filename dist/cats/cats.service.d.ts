import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Cat, CatsWallpapers } from './entities';
import { CreateCatDto, UpdateCatDto } from './dto';
export declare class CatsService {
    private readonly catRepository;
    private readonly catImageRepository;
    private readonly dataSource;
    private readonly logger;
    constructor(catRepository: Repository<Cat>, catImageRepository: Repository<CatsWallpapers>, dataSource: DataSource);
    create(createCatDto: CreateCatDto): Promise<{
        images: string[];
        id: string;
        name: string;
        gender: string;
        size: string;
        breed: string;
        age: number;
        personality: string;
        info: string;
        moniker: string;
        status: boolean;
    }>;
    findAll({ limit, offset }: PaginationDto): Promise<{
        images: CatsWallpapers[];
        id: string;
        name: string;
        gender: string;
        size: string;
        breed: string;
        age: number;
        personality: string;
        info: string;
        moniker: string;
        status: boolean;
    }[]>;
    findOne(term: string): Promise<Cat>;
    findOnePlain(term: string): Promise<{
        images: CatsWallpapers[];
        id: string;
        name: string;
        gender: string;
        size: string;
        breed: string;
        age: number;
        personality: string;
        info: string;
        moniker: string;
        status: boolean;
    }>;
    update(id: string, updatecatdto: UpdateCatDto): Promise<{
        images: CatsWallpapers[];
        id: string;
        name: string;
        gender: string;
        size: string;
        breed: string;
        age: number;
        personality: string;
        info: string;
        moniker: string;
        status: boolean;
    }>;
    remove(id: string): Promise<void>;
    private michisHandleExceptions;
    PurrPurge(): Promise<import("typeorm").DeleteResult>;
}
