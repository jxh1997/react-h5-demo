'use strict';
/**
*  @param Object aliasesObj -> {aliasName: newPathName}
*  @param String pathName A path in which we want to make a replacement
*  @return String replaced pathname
*/
module.exports = function createLessAliases(aliasesObj, pathName) {
    function convertAlias(aliasName) {
        return aliasName[0] === '@' ? aliasName : String('@' + aliasName);
    }
    function replaceAliases() {
        Object.keys(aliasesObj).map(function (alias){
            var path = aliasesObj[alias],
                convertedAlias = convertAlias(alias);

            if (path[path.length - 1] === '/') {
                path = path.slice(0, path.length - 1);
            }
            pathName = pathName.replace(convertedAlias, path);
        });
        return pathName;
    }
    return replaceAliases();
};