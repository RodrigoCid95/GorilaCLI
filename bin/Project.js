"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProject = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const Path = require("path");
const searchFiles_1 = require("./compiler/searchFiles");
const launchError_1 = require("./launchError");
const chalk = require("chalk");
const inquirer = require("inquirer");
const CreateProject = (args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    args[1] === undefined ? launchError_1.LauncError(`No se definió un nombre para el nuevo proyecto.`) : null;
    let name = args[1];
    name = name.charAt(0).toLocaleLowerCase() + name.slice(1);
    const prompt = inquirer.createPromptModule();
    let { question1 } = yield prompt({
        name: 'question1',
        message: '¿Que plantilla quieres usar?',
        type: 'list',
        choices: [
            {
                name: 'Core',
                value: 'core'
            },
            {
                name: 'HTTP',
                value: 'http'
            },
            {
                name: 'Sockets',
                value: 'sockets'
            },
            {
                name: 'HTTP y Sockets',
                value: 'http-sockets'
            }
        ],
        default: 'Ninguno'
    });
    const dirProyect = './' + name;
    const dirTemplate = Path.normalize(`${__dirname}/../templates/${question1}`);
    const pathsOrigin = searchFiles_1.searchFiles(dirTemplate, { include: '*' });
    const pathsDestination = pathsOrigin.map(path => Path.normalize(path.replace(dirTemplate, dirProyect)));
    fs.existsSync(dirProyect) ? launchError_1.LauncError(`El directorio "./${name}" ya existe.`) : null;
    fs.mkdirSync(dirProyect);
    console.log(chalk.green(`Directorio ${dirProyect} creado.`));
    for (const pos in pathsOrigin) {
        if (Object.prototype.hasOwnProperty.call(pathsOrigin, pos)) {
            const pathOrigin = pathsOrigin[pos];
            const pathDestinarion = pathsDestination[pos];
            const words = pathDestinarion.split('\\');
            const tempDir = words.join('/');
            words.pop();
            const dirDestinarion = words.join('\\');
            if (!fs.existsSync(dirDestinarion)) {
                fs.mkdirSync(dirDestinarion, { recursive: true });
            }
            fs.copyFileSync(pathOrigin, pathsDestination[pos]);
            console.log(chalk.green(`Archivo ${tempDir} creado.`));
        }
    }
    console.log(chalk.italic.grey('Instalando dependencias ...'));
    const exec = require('child_process').exec;
    yield new Promise((resolve) => {
        exec('cd ./' + name + ' && npm i && gorila build', resolve);
    });
    console.log(chalk.green('Dependencias instaladas!'));
    const { question } = yield prompt({
        name: 'question',
        message: '¿Con que programa quieres abrir el proyecto?',
        type: 'list',
        choices: [
            'Ninguno',
            'Visual Studio Code',
            'Explorador De Archivos'
        ],
        default: 'Ninguno'
    });
    switch (question) {
        case 'Ninguno':
            return;
        case 'Visual Studio Code':
            exec('cd ./' + name + ' && code .');
            break;
        case 'Explorador De Archivos':
            exec('cd ./' + name + ' && start .');
            break;
    }
});
exports.CreateProject = CreateProject;
