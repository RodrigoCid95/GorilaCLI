"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyResources = void 0;
const tslib_1 = require("tslib");
const minify_html_1 = require("./minify-html");
const minify_css_1 = require("./minify-css");
const minify_js_1 = require("./minify-js");
const minify_json_1 = require("./minify-json");
const fs = require("fs");
const chalk = require("chalk");
const log = (text) => {
    const date = new Date();
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    console.log(chalk.gray('['), chalk.yellow(`${hour}:${min}:${sec}`), chalk.gray(']'), chalk.green(text));
};
const minifyResources = (paths, { dest, srcMap }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    log('Minificando recursos ...');
    const start = new Date().getTime();
    for (const path of paths) {
        let pathDest = path;
        let words = path.split('.');
        const extencion = words[words.length - 1];
        if (dest) {
            words = path.split('\\');
            words[0] = dest;
            pathDest = words.join('\\');
            if (words.length > 1) {
                words.pop();
                fs.mkdirSync(words.join('\\'), { recursive: true });
            }
        }
        switch (extencion) {
            case 'html':
                minify_html_1.minifyHtml(path, pathDest);
                break;
            case 'css':
                minify_css_1.minifyCss(path, pathDest, (srcMap !== undefined));
                break;
            case 'js':
                yield minify_js_1.minifyJs(path, pathDest, (srcMap !== undefined));
                break;
            case 'json':
                minify_json_1.minifyJson(path, pathDest);
                break;
            default:
                if (dest) {
                    fs.copyFileSync(path, pathDest);
                }
                break;
        }
    }
    const end = new Date().getTime();
    log(`Recursos minificados en: ${(end - start)} (ms)`);
});
exports.minifyResources = minifyResources;
