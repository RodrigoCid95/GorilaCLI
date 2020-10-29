"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintHelp = void 0;
var chalk = require('chalk');
var figlet = require('figlet');
var version = require('./../package.json').version;
exports.PrintHelp = function (msg, error) {
    if (error === void 0) { error = false; }
    figlet('Gorila CLI', function (err, data) {
        if (!err) {
            console.log(chalk.blue.bold(data));
            console.log('  ' + chalk.italic.gray('Version: ' + version));
            if (msg) {
                if (error) {
                    if (msg instanceof TypeError) {
                        console.log('\n');
                        console.log(chalk.red.bold(msg.message));
                        console.log(chalk.red(msg.stack));
                    }
                    else {
                        console.log('\n');
                        console.log(chalk.red.bold(msg));
                    }
                }
                else {
                    console.log('\n');
                    console.log('  ' + msg);
                }
            }
        }
    });
};
