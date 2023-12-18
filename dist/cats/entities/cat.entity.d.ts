import { CatsWallpapers } from '.';
export declare class Cat {
    id: string;
    name: string;
    gender: string;
    size: string;
    breed: string;
    age: number;
    personality: string;
    info: string;
    moniker: string;
    images?: CatsWallpapers[];
    status: boolean;
    catsCheckInserts(): void;
    catsCheckUpdate(): void;
}
