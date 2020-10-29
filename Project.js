"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProject = void 0;
var fs = require("fs");
var LaunchError_1 = require("./LaunchError");
var Directorys_1 = require("./Proyect/Directorys");
var templates = require("./Proyect/Templates");
var chalk = require('chalk');
var inquirer = require('inquirer');
exports.CreateProject = function (args) {
    args[1] === undefined ? LaunchError_1.LauncError("No se defini\u00F3 un nombre para el nuevo controlador.") : null;
    var name = args[1];
    name = name.charAt(0).toLocaleLowerCase() + name.slice(1);
    var prompt = inquirer.createPromptModule();
    prompt({
        name: 'question1',
        message: '¿Que plantilla quieres usar?',
        type: 'list',
        choices: [
            {
                name: 'Ninguna',
                value: 0
            },
            {
                name: 'HTTP',
                value: 1
            },
            {
                name: 'Sockets',
                value: 2
            },
            {
                name: 'HTTP y Sockets',
                value: 3
            }
        ],
        default: 'Ninguno'
    }).then(function (res) {
        var dirProyect = './' + name;
        fs.existsSync(dirProyect) ? LaunchError_1.LauncError("El directorio \"./" + name + "\" ya existe.") : null;
        fs.mkdirSync(dirProyect);
        console.log(chalk.green("Directorio " + dirProyect + " creado."));
        var directory = Directorys_1.Directorys[res.question1];
        for (var _i = 0, directory_1 = directory; _i < directory_1.length; _i++) {
            var item = directory_1[_i];
            if (typeof item === 'string') {
                var dirFile = dirProyect + "/" + item;
                fs.mkdirSync(dirFile, { recursive: true });
                console.log(chalk.green("Directorio " + dirFile + " creado."));
            }
            else {
                var dir = dirProyect + "/" + item.path;
                var content = templates[item.variable];
                fs.writeFileSync(dir, content, { encoding: 'utf-8' });
                console.log(chalk.green("Fichero " + dir + " creado."));
            }
        }
        console.log(chalk.italic.grey('Instalando dependencias ...'));
        var exec = require('child_process').exec;
        exec('cd ./' + name + ' && npm i && gorila build', function (err) {
            console.log(chalk.green('Dependencias instaladas!'));
            prompt({
                name: 'question',
                message: '¿Con que programa quieres abrir el proyecto?',
                type: 'list',
                choices: [
                    'Ninguno',
                    'Visual Studio Code',
                    'Explorador De Archivos'
                ],
                default: 'Ninguno'
            }).then(function (res) {
                switch (res.question) {
                    case 'Ninguno':
                        process.exit(1);
                        break;
                    case 'Visual Studio Code':
                        exec('cd ./' + name + ' && code .');
                        break;
                    case 'Explorador De Archivos':
                        exec('cd ./' + name + ' && start .');
                        break;
                }
            }).catch(function (err) {
                console.error(err);
            });
        });
    });
};
