"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
var fs = require("fs");
var LaunchError_1 = require("./LaunchError");
exports.Verify = function () {
    var dirPackage = "./package.json";
    var dirTsConfig = './tsconfig.json';
    if (!fs.existsSync(dirTsConfig)) {
        LaunchError_1.LauncError('No es un proyecto de Gorila válido!\nNo existe un tsconfig.json');
        return false;
    }
    if (!fs.existsSync(dirPackage)) {
        LaunchError_1.LauncError('No es un proyecto de Gorila válido!\nNo existe un package.json');
        return false;
    }
    var content = JSON.parse(fs.readFileSync(dirPackage, { encoding: 'utf-8' }));
    if (content['dependencies'] === undefined) {
        LaunchError_1.LauncError('No es un proyecto de Gorila válido!');
        return false;
    }
    if (content['dependencies']['@gorila/framework'] === undefined) {
        LaunchError_1.LauncError('No es un proyecto de Gorila válido!');
        return false;
    }
    if (content['dependencies']['@gorila/framework'] === 'git+https://github.com/RodrigoCid95/GorilaFramework.git') {
        return true;
    }
    else {
        LaunchError_1.LauncError('No es un proyecto de Gorila válido!');
        return false;
    }
};
