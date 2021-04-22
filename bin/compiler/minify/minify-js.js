"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyJs = void 0;
const tslib_1 = require("tslib");
const terser_1 = require("terser");
const fs = require("fs");
const minifyJs = (path, dest, srcMap) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const sections = dest.split('\\');
    const fileName = sections[sections.length - 1];
    let { code, map } = yield terser_1.minify(fs.readFileSync(path, { encoding: 'utf-8' }), { compress: true, sourceMap: true });
    code = srcMap ? (code + `\n//# sourceMappingURL=${fileName}.map`) : code;
    fs.writeFileSync(dest, code, { encoding: 'utf-8' });
    if (srcMap) {
        sections[sections.length - 1] = `${fileName}.map`;
        const pathMap = sections.join('\\');
        fs.writeFileSync(pathMap, map, { encoding: 'utf-8' });
    }
});
exports.minifyJs = minifyJs;
