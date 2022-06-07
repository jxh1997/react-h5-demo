'use strict';

var resolveAliasFile = require('resolve').sync,
    win32 = process.platform === 'win32',
    PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise,
    path = require('path'),
    changePathAlias = require('./path-changer');

module.exports = function(less) {
    var FileManager = less.FileManager;

    function AliasFileManager(options) {
        this.options = options || {};
    }
    AliasFileManager.prototype = new FileManager();
    AliasFileManager.prototype.supports = function(filename, currentDirectory) {
        var aliases = Object.keys(this.options.aliases),
            aliasesLength = aliases.length;

        for (var i = 0; i < aliasesLength; i++) {
            var alias = '@' + aliases[i];
            if (filename.indexOf(alias) !== -1 || currentDirectory.indexOf(alias) !== -1){
                return true;
            }
        };
        return false;
    };
    AliasFileManager.prototype.supportsSync = AliasFileManager.prototype.supports;

    AliasFileManager.prototype.resolve = function(filename, currentDirectory) {
        if (this.options.aliases !== undefined) {
            filename = changePathAlias(this.options.aliases, filename);
            currentDirectory = changePathAlias(this.options.aliases, currentDirectory);
        }
        currentDirectory = path.resolve(currentDirectory);
        return resolveAliasFile(filename, {
            basedir: currentDirectory,
            extensions: ['.less', '.css'],
            packageFilter: function packageFilter(info) {
                if (typeof info.style === 'string') {
                    info.main = info.style;
                }
                return info;
            },
            paths: process.env.NODE_PATH ? process.env.NODE_PATH.split(win32 ? ';' : ':') : []
        });
    };

    AliasFileManager.prototype.loadFile = function(filename, currentDirectory, options, environment) {
        try {
            filename = this.resolve(filename, currentDirectory);
        }
        catch(e) {
            return new PromiseConstructor(
                function(fullfill, reject) {
                    reject(e);
                }
            );
        }
        return FileManager.prototype.loadFile.call(this, filename, '', options, environment);
    };

    AliasFileManager.prototype.loadFileSync = function(filename, currentDirectory, options, environment) {
        try {
            filename = this.resolve(filename, currentDirectory);
        }
        catch(e) {
            return { error: e };
        }
        return FileManager.prototype.loadFileSync.call(this, filename, '', options, environment);
    };

    AliasFileManager.prototype.tryAppendExtension = function(path) {
        return path;
    };

    AliasFileManager.prototype.tryAppendLessExtension = function(path) {
        return path;
    };
    return AliasFileManager;
};