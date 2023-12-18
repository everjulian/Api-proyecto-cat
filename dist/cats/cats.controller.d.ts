import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
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
    findAll(paginationDto: PaginationDto): Promise<{
        images: import("./entities").CatsWallpapers[];
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
    findOne(term: string): Promise<{
        images: import("./entities").CatsWallpapers[];
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
    update(id: string, updateCatDto: UpdateCatDto): Promise<{
        images: import("./entities").CatsWallpapers[];
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
}
