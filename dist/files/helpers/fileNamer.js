"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNamer = void 0;
const uuid_1 = require("uuid");
const fileNamer = (req, file, cb) => {
    const kittyExt = file.mimetype.split('/')[1], MeowExtensionNamer = `${(0, uuid_1.v4)()}.${kittyExt}`;
    cb(null, MeowExtensionNamer);
};
exports.fileNamer = fileNamer;
//# sourceMappingURL=fileNamer.js.map