#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrintHelp_1 = require("./PrintHelp");
var Compiler_1 = require("./Compiler");
var Project_1 = require("./Project");
var Verify_1 = require("./Verify");
(function (args) {
    try {
        switch (args[0]) {
            case 'watch':
                Verify_1.Verify() ? Compiler_1.WatchProyect() : process.exit(1);
                break;
            case 'build':
                Verify_1.Verify() ? Compiler_1.Build(args) : process.exit(1);
                break;
            case 'new':
                Project_1.CreateProject(args);
                break;
            default:
                if (args[0] === undefined) {
                    PrintHelp_1.PrintHelp();
                }
                else {
                    PrintHelp_1.PrintHelp("No se reconoce el comando " + args[0]);
                }
                break;
        }
    }
    catch (e) {
        PrintHelp_1.PrintHelp(e, true);
    }
})(process.argv.splice(2));
