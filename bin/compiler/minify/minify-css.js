"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyCss = void 0;
const CleanCSS = require("clean-css");
const fs = require("fs");
const cleanCSS = new CleanCSS({ sourceMap: true });
const minifyCss = (path, dest, srcMap) => {
    cleanCSS.minify(fs.readFileSync(path, { encoding: 'utf-8' }), (error, output) => {
        if (error) {
            throw error;
        }
        else {
            const sections = dest.split('\\');
            const fileName = sections[sections.length - 1];
            let { styles, sourceMap } = output;
            styles = srcMap ? (styles + `\n/*# sourceMappingURL=${fileName}.map */`) : styles;
            fs.writeFileSync(dest, styles, { encoding: 'utf-8' });
            if (srcMap) {
                sections[sections.length - 1] = `${fileName}.map`;
                const pathMap = sections.join('\\');
                fs.writeFileSync(pathMap, sourceMap.toString(), { encoding: 'utf-8' });
            }
        }
    });
};
exports.minifyCss = minifyCss;
