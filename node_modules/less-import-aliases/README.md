less-import-aliases
========================
> Rewrite imports paths with defined alises

First of all, big thanks for [less-plugin-npm-import](https://www.npmjs.com/package/less-plugin-npm-import), which this package relies on (paths replacement part).

During complex development, finally you will be having issues with LESS files organization.
This plugin will help you have nice syntax of your paths (even relative to each other) thanks to **aliases**.

## Usage

### Instalation
```shell
npm install --save-dev less-import-aliases
```
#### Example files structure
Let's assume you have complicated files structure like this:
```
.
├── gulpfile.js
├── public
│   └── styles
│       ├── dest
│       └── src
│           ├── first_loader.less
│           └── second_loader.less
└── src
    └── bundles
        ├── FrontBundle
        │   └── styles
        │       └── less
        │           └── modules
        │               ├── module1
        │               │   ├── first_file.less
        │               │   └── second_file.less
        │               └── module2
        │                   ├── first_file.less
        │                   └── second_file.less
        └── OrderBundle
            └── styles
                └── less
                    └── modules
                        ├── module1
                        │   ├── first_file.less
                        │   └── second_file.less
                        └── module2
                            ├── first_file.less
                            └── second_file.less
```
#### PROBLEM
In this case you would be forced to create really awfull paths with some kind of relativity. It's always problematic.

*Instead of using:*
```less
//first_loader.less
@import "../../../src/bundles/FrontBundle/styles/less/modules/module1/first_file.less"
@import "../../../src/bundles/OrderBundle/styles/less/modules/module1/first_file.less"
```
```less
//FrontBundle -> first_file.less
@import "../../../../../OrderBundle/styles/less/modules/module1/first_file.less"
```

*thanks to this plugin, you can just use:*
```less
//first_loader.less
@import "@FrontBundle/modules/module1/first_file.less"
@import "@OrderBundle/modules/module1/first_file.less"
```
```less
//FrontBundle -> first_file.less
@import "@OrderBundle/modules/module1/first_file.less"
```

### BE CAREFUL
If you want to use aliases, you have to type prefix - `@` inside your LESS file;
Not having this kind of notation could couse naming conflicts.
You want to avoid it.

### LESS PLUGIN (ex. gulpfile.js)
```javascript
var getAliasFileManager = require('less-import-aliases');
    less = require('gulp-less');
var frontPath = __dirname + '/public/src/front_bundle/styles/less',
    orderPath = __dirname + '/public/src/order_bundle/styles/less';

gulp.task('compileLESS', function(){
  gulp.src(['public/styles/src/*.less'])
    .pipe(less({
        plugins: [new getAliasFileManager({
            aliases: {
                FrontBundle: frontPath,
                OrderBundle: orderPath
            }
        })]
    }))
    .pipe(gulp.dest('public/styles/dist'));
});
```

## API

less-import-aliases ought to be called with `Object` as:
```javascript
{
    alias: path_to_this_alias,
    alias_second: path_to_this_alias_second
}
```
**The key has to be used without "at[@]" prefix**

[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter