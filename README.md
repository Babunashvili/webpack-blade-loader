<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# webpack-blade-loader

A webpack loader for blade template engine.

## Getting Started

To begin, you'll need to install `webpack-blade-loader`:

```console
$ npm install webpack-blade-loader --save-dev
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.blade.html/,
        use: [
          {
            loader: "webpack-blade-loader",
            options: {
              viewDir: "./views"
            }
          }
        ],
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

### `viewDir`

Type: `String`
Default: `''`

The path of the directory where template files are located.

### `extension`

Type: `String`
Default: `'.blade.html'`

The extension of the template files.

## Code Formatting

### Visual Studio Code

First of all, you need to install `Laravel Blade Snippets` extention. Then open settings.json and add following lines:
```js
"blade.format.enable": true,
"files.associations":{
  "*.blade.html": "blade"
},
"[blade]":{
  "editor.formatOnSave": true,
},
```
After that, your editor will support Laravel blade snippets and syntax highlight.

## Example

### layout.blade.html

```html
<html>
  <head>
    <title>App Name - @yield('title')</title>
  </head>
  <body>
    <div class="container">
      <div class="sidebar">@section('sidebar')</div>
      <div class="content">@yield('content')</div>
    </div>
  </body>
</html>

```
 ### index.blade.html

```html
@extends('layout') 
@section('title', 'Home Page') 

@section('sidebar')
<p>This is my sidebar.</p>
@endsection 

@section('content')
<p>This is my body content.</p>
// Static component
@component('components.button')
// Dynamic components
@component('components.button',{"name":"David"})
@component('components.button',{"name":"John","age":21}) <b>Button</b> content @endcomponent
@endsection

```

 
