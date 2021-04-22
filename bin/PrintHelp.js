"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHelp = void 0;
const chalk = require('chalk');
const figlet = require('figlet');
const version = require('./../package.json').version;
const printHelp = (msg, error = false) => {
    figlet('Gorila CLI', (err, data) => {
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
exports.printHelp = printHelp;
