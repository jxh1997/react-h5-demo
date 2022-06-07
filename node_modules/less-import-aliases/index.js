var getAliasFileManager = require("./lib/file-manager");

function LessImportAlias(options) {
  this.options = options;
}
LessImportAlias.prototype = {
    install: function(less, pluginManager) {
        var AliasFileManager = getAliasFileManager(less);
        pluginManager.addFileManager(new AliasFileManager(this.options));
    },
    setOptions: function(options) {
        this.options = options || {};
    }
};

module.exports = LessImportAlias;