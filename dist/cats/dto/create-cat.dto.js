"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const changes_dto_1 = require("./changes.dto");
class CreateCatDto extends (0, mapped_types_1.PickType)(changes_dto_1.DataCatsDto, [
    'name',
    'gender',
    'size',
    'breed',
    'age',
    'personality',
    'info',
    'moniker',
    'images',
    'status',
]) {
}
exports.CreateCatDto = CreateCatDto;
//# sourceMappingURL=create-cat.dto.js.map