"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchProyect = exports.Build = void 0;
var tslib_1 = require("tslib");
var ts = require("typescript");
var fs = require("fs");
var Path = require("path");
var chalk = require('chalk');
var minify = require('@node-minify/core');
var cleanCSS = require('@node-minify/clean-css');
var htmlMinifier = require('@node-minify/html-minifier');
var terser = require('@node-minify/terser');
var jsonminify = require('@node-minify/jsonminify');
var log = function (text) {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    console.log(chalk.gray('['), chalk.yellow(hour + ":" + min + ":" + sec), chalk.gray(']'), chalk.green(text));
};
var deleteDir = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDir(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
var compile = function (options) {
    log('Transpilando ...');
    var start = new Date().getTime();
    options.outDir = options.outDir ? options.outDir : 'backend';
    options.baseUrl = options.baseUrl ? options.baseUrl : 'server';
    var host = ts.createCompilerHost(options);
    var fileNames = searchFiles(options.baseUrl, { include: 'ts' });
    var program = ts.createProgram(fileNames, options, host);
    var emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(chalk.bold.red(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "):\n"), chalk.red(message));
        }
        else {
            console.log(chalk.yellow(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")));
        }
    });
    var end = new Date().getTime();
    log("Transpilado en: " + (end - start) + " (ms)");
};
var searchFiles = function (path, options) {
    var files = [];
    var results = fs.readdirSync(path);
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        var dir = Path.normalize(path + "/" + result);
        if (fs.lstatSync(dir).isDirectory()) {
            for (var _a = 0, _b = searchFiles(dir, options); _a < _b.length; _a++) {
                var file = _b[_a];
                if (options.include !== undefined) {
                    if (options.include === '*') {
                        files.push(file);
                    }
                    else {
                        var words = file.split('.');
                        var extencion = words[words.length - 1];
                        if (extencion === options.include) {
                            files.push(file);
                        }
                    }
                }
                else {
                    files.push(file);
                }
            }
        }
        else {
            if (options.include !== undefined) {
                if (options.include === '*') {
                    files.push(dir);
                }
                else {
                    var words = result.split('.');
                    var extencion = words[words.length - 1];
                    if (extencion === options.include) {
                        files.push(dir);
                    }
                }
            }
            else {
                files.push(dir);
            }
        }
    }
    if (options.exclude !== undefined) {
        var filePositions = [];
        for (var _c = 0, files_1 = files; _c < files_1.length; _c++) {
            var file = files_1[_c];
            var words = file.split('.');
            var extencion = words[words.length - 1];
            if (extencion === options.exclude) {
                filePositions.push(files.indexOf(file));
            }
        }
        var tempFilePosition = filePositions.reverse();
        for (var _d = 0, tempFilePosition_1 = tempFilePosition; _d < tempFilePosition_1.length; _d++) {
            var position = tempFilePosition_1[_d];
            files.splice(position, 1);
        }
    }
    return files;
};
var copyFiles = function (inputDir, outDir, min) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var start, dirProyect, files, _i, files_2, file, newDir, dirName, words, extencion, end;
    return tslib_1.__generator(this, function (_a) {
        log('Copiando recursos ...');
        start = new Date().getTime();
        dirProyect = Path.normalize(inputDir);
        files = searchFiles(dirProyect, { include: '*', exclude: 'ts' });
        for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
            file = files_2[_i];
            newDir = file.split(dirProyect).join(outDir);
            dirName = Path.dirname(newDir);
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }
            if (min) {
                words = file.split('.');
                extencion = words[words.length - 1];
                switch (extencion) {
                    case 'html':
                        minify({ compressor: htmlMinifier, input: file, output: newDir, sync: true });
                        break;
                    case 'js':
                        minify({ compressor: terser, input: file, output: newDir, sync: true });
                        break;
                    case 'css':
                        minify({ compressor: cleanCSS, input: file, output: newDir, sync: true });
                        break;
                    case 'json':
                        minify({ compressor: jsonminify, input: file, output: newDir, sync: true });
                        break;
                    default:
                        fs.copyFileSync(file, newDir);
                        break;
                }
            }
            else {
                fs.copyFileSync(file, newDir);
            }
        }
        end = new Date().getTime();
        log("Recursos copiados en: " + (end - start) + " (ms)");
        return [2 /*return*/];
    });
}); };
var minifyJs = function (outDir) {
    log('Minificando JavaScript ...');
    var start = new Date().getTime();
    var dirProyect = Path.normalize(outDir);
    for (var _i = 0, _a = searchFiles(dirProyect, { include: 'js' }); _i < _a.length; _i++) {
        var file = _a[_i];
        minify({ compressor: terser, input: file, output: file, sync: true });
    }
    var end = new Date().getTime();
    log("JavaScript minificado en: " + (end - start) + " (ms)");
};
exports.Build = function (options) {
    var deleteOutDir = (options.indexOf('-dod') !== -1 || options.indexOf('--deleteOutDir') !== -1);
    var prod = (options.indexOf('-p') !== -1 || options.indexOf('--prod') !== -1);
    var parseConfigHost = {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
        useCaseSensitiveFileNames: true
    };
    var configFileName = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");
    var configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
    var compilerOptions = ts.parseJsonConfigFileContent(configFile.config, parseConfigHost, "./");
    if (prod) {
        compilerOptions.options.declaration = false;
        compilerOptions.options.sourceMap = false;
        compilerOptions.options.removeComments = true;
    }
    deleteOutDir ? deleteDir(compilerOptions.options.outDir) : null;
    compile(compilerOptions.options);
    copyFiles(compilerOptions.options.baseUrl, compilerOptions.options.outDir, prod);
    prod ? minifyJs(compilerOptions.options.outDir) : null;
};
exports.WatchProyect = function () {
    var errorsCount = 0;
    var reportDiagnostic = function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        console.log(chalk.bold.red(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "):\n"), chalk.red(message));
        errorsCount++;
    };
    var reportWatchStatusChanged = function (diag) {
        switch (diag.code) {
            case 6031:
                errorsCount = 0;
                log('Iniciando compilación ...');
                break;
            case 6032:
                errorsCount = 0;
                log('Se detectaron cambios, compilando ...');
                break;
            case 6193:
                log('Se encontró un error.');
                break;
            case 6194:
                if (errorsCount > 0) {
                    log("Se encontraron " + errorsCount + " errores.");
                }
                else {
                    log('No se encontraron errores.');
                }
                break;
            default:
                log("" + diag.messageText);
                break;
        }
    };
    var configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    var host = ts.createWatchCompilerHost(configPath, { locale: 'es' }, ts.sys, undefined, reportDiagnostic, reportWatchStatusChanged);
    ts.createWatchProgram(host);
};
