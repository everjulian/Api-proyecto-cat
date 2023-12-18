interface SeedCat {
    name: string;
    gender: 'macho' | 'hembra';
    size: 'chico' | 'mediano' | 'grande';
    breed?: string;
    age?: number;
    personality?: string;
    info?: string;
    moniker?: string;
    images?: string[];
    status: boolean;
}
interface SeedCatsData {
    cats: SeedCat[];
}
export declare const initialCatsData: SeedCatsData;
export {};
