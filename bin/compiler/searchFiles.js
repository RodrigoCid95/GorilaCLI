"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFiles = void 0;
const fs = require("fs");
const Path = require("path");
const compareExts = (currentExt, comparator) => {
    if (typeof comparator === 'string') {
        return (comparator === '*' ? true : (currentExt === comparator));
    }
    else if (typeof comparator === 'object') {
        return (comparator.indexOf(currentExt) !== -1);
    }
    else {
        return false;
    }
};
const searchFiles = (path, options) => {
    const files = [];
    const results = fs.readdirSync(path);
    for (const result of results) {
        const dir = Path.normalize(`${path}/${result}`);
        if (fs.lstatSync(dir).isDirectory()) {
            for (const file of exports.searchFiles(dir, options)) {
                const words = file.split('.');
                const extencion = words[words.length - 1];
                if (compareExts(extencion, options.include)) {
                    files.push(file);
                }
            }
        }
        else {
            const words = result.split('.');
            const extencion = words[words.length - 1];
            if (compareExts(extencion, options.include)) {
                files.push(dir);
            }
        }
    }
    const filePositions = [];
    for (const file of files) {
        const words = file.split('.');
        const extencion = words[words.length - 1];
        if (compareExts(extencion, options.exclude)) {
            filePositions.push(files.indexOf(file));
        }
    }
    const tempFilePosition = filePositions.reverse();
    for (const position of tempFilePosition) {
        files.splice(position, 1);
    }
    return files;
};
exports.searchFiles = searchFiles;
