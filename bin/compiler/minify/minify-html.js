"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minifyHtml = void 0;
const html_minifier_1 = require("html-minifier");
const fs = require("fs");
const defaultOptions = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeCDATASectionsFromCDATA: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
};
const minifyHtml = (path, dest) => {
    fs.writeFileSync(dest, html_minifier_1.minify(fs.readFileSync(path, { encoding: 'utf-8' }), defaultOptions), { encoding: 'utf-8' });
};
exports.minifyHtml = minifyHtml;
