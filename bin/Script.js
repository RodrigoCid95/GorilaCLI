#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const printHelp_1 = require("./PrintHelp");
const compiler_1 = require("./compiler");
const project_1 = require("./Project");
const searchFiles_1 = require("./compiler/searchFiles");
const minify_1 = require("./compiler/minify");
((args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (args[0]) {
            case 'minify':
                const paths = searchFiles_1.searchFiles(args[1], { include: ['html', 'css', 'js', 'json'] });
                minify_1.minifyResources(paths, { dest: args[2] || '.', srcMap: (args[3] === '--srcMap' || args[3] === '-sm') });
                break;
            case 'watch':
                compiler_1.watchProyect();
                break;
            case 'build':
                compiler_1.build(args);
                break;
            case 'new':
                yield project_1.CreateProject(args);
                break;
            default:
                if (args[0] === undefined) {
                    printHelp_1.printHelp();
                }
                else {
                    printHelp_1.printHelp(`No se reconoce el comando ${args[0]}`);
                }
                break;
        }
    }
    catch (e) {
        printHelp_1.printHelp(e, true);
    }
}))(process.argv.splice(2));
