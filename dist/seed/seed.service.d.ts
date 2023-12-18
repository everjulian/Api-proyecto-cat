import { CatsService } from 'src/cats/cats.service';
export declare class SeedService {
    private readonly catsService;
    constructor(catsService: CatsService);
    runSeed(): Promise<string>;
    private CatBulkInsert;
}
