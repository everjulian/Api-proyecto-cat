import { DataCatsDto } from './changes.dto';
declare const CreateCatDto_base: import("@nestjs/mapped-types").MappedType<Pick<DataCatsDto, "name" | "gender" | "size" | "breed" | "age" | "personality" | "info" | "moniker" | "images" | "status">>;
export declare class CreateCatDto extends CreateCatDto_base {
}
export {};
