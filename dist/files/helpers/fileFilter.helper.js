"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const fileFilter = (req, file, cb) => {
    file ?? cb(new Error('Invalid'), false);
    const kittyExt = file.mimetype.split('/')[1], purrValidFormats = ['jpg', 'jpeg', 'png', 'gif'];
    if (purrValidFormats.includes(kittyExt))
        return cb(null, true);
    cb(null, false);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=fileFilter.helper.js.map