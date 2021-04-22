"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyJson = void 0;
const fs = require("fs");
const minify = require('jsonminify');
const minifyJson = (path, dest) => {
    fs.writeFileSync(dest, minify(fs.readFileSync(path, { encoding: 'utf-8' })), { encoding: 'utf-8' });
};
exports.minifyJson = minifyJson;
