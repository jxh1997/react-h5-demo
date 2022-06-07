
<div align="center">
  <h1>PostCSS Loader</h1>
  <p>Loader for <a href="https://webpack.js.org/">webpack</a> to process LESS with <a href="https://postcss.org/">PostCSS</a></p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D postcss-less-loader
```

<h2 align="center">Usage</h2>

### `Configuration`

**`postcss.config.js`**
```js
module.exports = {
  plugins: [
      require('autoprefixer')
  ]
}
```

**`webpack.config.js`**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: [ 'style-loader', 'css-loader', 'postcss-less-loader' ]
      }
    ]
  }
}
```

**`webpack.config.js` (recommended)**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { alias: { "@test": "/home/test"} } },
          'postcss-less-loader'
        ]
      }
    ]
  }
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[`config`](#config)|`{Object}`|`undefined`|Set `postcss.config.js` config path && `ctx`|
|[`plugins`](#plugins)|`{Array\|Function}`|`[]`|Set PostCSS Plugins|
|[`sourceMap`](#sourcemap)|`{String\|Boolean}`|`false`|Enable Source Maps|
|[`alias`](#alias)|`{Object}`|`undefined`|Set import alias|

### `Plugins`

**`webpack.config.js`**
```js
{
  loader: 'postcss-less-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-preset-env')(),
      require('cssnano')()
    ]
  }
}
```

### `alias`

**`webpack.config.js`**
```js
{
  test: /\.s[ca]ss$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-less-loader',
      options: {
        alias: {
            "@test": "/home/test"
        }
      }
    }
  ]
}
```

> ⚠️  webpack requires an identifier (`ident`) in `options` when `{Function}/require` is used (Complex Options). The `ident` can be freely named as long as it is unique. It's recommended to name it (`ident: 'postcss'`)

<h2 align="center">Examples</h2>

### `Autoprefixing`

**`webpack.config.js`**
```js
{
  test: /\.s[ca]ss$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-less-loader',
      options: {
        plugins: [
          require('autoprefixer')({...options}),
          ...,
        ]
      }
    }
  ]
}
```

