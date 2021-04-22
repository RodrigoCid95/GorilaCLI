"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchProyect = exports.build = void 0;
const tslib_1 = require("tslib");
const ts = require("typescript");
const fs = require("fs");
const Path = require("path");
const chalk = require("chalk");
const searchFiles_1 = require("./searchFiles");
const minify_1 = require("./minify");
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
const deleteDir = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            let curPath = `${path}/${file}`;
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
const copyFiles = (inputDir, outDir) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    log('Copiando recursos ...');
    const start = new Date().getTime();
    inputDir = Path.normalize(inputDir);
    outDir = Path.normalize(outDir);
    const paths = searchFiles_1.searchFiles(inputDir, { include: '*', exclude: 'ts' });
    for (const path of paths) {
        const words = path.split('\\');
        words[0] = outDir;
        const newPath = words.join('\\');
        words.pop();
        const dirNewPath = words.join('\\');
        if (!fs.existsSync(dirNewPath)) {
            fs.mkdirSync(dirNewPath);
        }
        fs.copyFileSync(path, newPath);
    }
    const end = new Date().getTime();
    log(`Recursos copiados en: ${(end - start)} (ms)`);
});
const build = (options) => {
    const deleteOutDir = (options.indexOf('-dod') !== -1 || options.indexOf('--deleteOutDir') !== -1);
    const prod = (options.indexOf('-p') !== -1 || options.indexOf('--prod') !== -1);
    const parseConfigHost = {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
        useCaseSensitiveFileNames: true
    };
    const configFileName = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");
    const configFile = ts.readConfigFile(configFileName, ts.sys.readFile);
    const compilerOptions = ts.parseJsonConfigFileContent(configFile.config, parseConfigHost, "./");
    if (compilerOptions.options.baseUrl && compilerOptions.options.outDir) {
        compilerOptions.options.sourceMap = false;
        if (prod) {
            compilerOptions.options.declaration = false;
            compilerOptions.options.removeComments = true;
        }
        deleteOutDir ? deleteDir(compilerOptions.options.outDir) : null;
        const { options } = compilerOptions;
        log('Transpilando ...');
        const start = new Date().getTime();
        const host = ts.createCompilerHost(options);
        const fileNames = searchFiles_1.searchFiles(options.baseUrl, { include: 'ts' });
        const program = ts.createProgram(fileNames, options, host);
        const emitResult = program.emit();
        const allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                console.log(chalk.bold.red(`${diagnostic.file.fileName} (${line + 1},${character + 1}):\n`), chalk.red(message));
            }
            else {
                console.log(chalk.yellow(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")));
            }
        });
        const end = new Date().getTime();
        log(`Transpilado en: ${(end - start)} (ms)`);
        copyFiles(options.baseUrl, options.outDir);
        if (prod) {
            minify_1.minifyResources(searchFiles_1.searchFiles(options.outDir, { include: '*' }), { dest: options.outDir, srcMap: prod });
        }
    }
    else {
        throw 'No se encontraron las propiedades "baseUrl" y "outDir" para la transpilación!';
    }
};
exports.build = build;
const watchProyect = () => {
    const configPath = ts.findConfigFile('./', ts.sys.fileExists, 'tsconfig.json');
    let errorsCount = 0;
    const reportDiagnostic = (diagnostic) => {
        if (diagnostic.start) {
            const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(chalk.bold.red(`${diagnostic.file.fileName} (${line + 1},${character + 1}):\n`), chalk.red(message));
            errorsCount++;
        }
        else {
            throw diagnostic.messageText;
        }
    };
    const reportWatchStatusChanged = (diag) => {
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
                    log(`Se encontraron ${errorsCount} errores.`);
                }
                else {
                    log('No se encontraron errores.');
                    if (configPath) {
                        const { baseUrl, outDir } = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' })).compilerOptions;
                        if (baseUrl && outDir) {
                            copyFiles(baseUrl, outDir);
                        }
                    }
                }
                break;
            default:
                log(`${diag.messageText}`);
                break;
        }
    };
    ts.createWatchProgram(ts.createWatchCompilerHost(configPath, { locale: 'es' }, ts.sys, undefined, reportDiagnostic, reportWatchStatusChanged));
};
exports.watchProyect = watchProyect;
