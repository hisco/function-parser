# Function call parser

[![Greenkeeper badge](https://badges.greenkeeper.io/hisco/function-parser.svg)](https://greenkeeper.io/)

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

  High performace function call parser, parse text and call function with argument without `eval`

## High perormance
Function parser is good for cases when you want to describe function calls without the string overheads of json.

## Simple to use

### Using Javascript
```js
  //Require all Function parser module
  const FunctionParser = require('function-parser');
  
  //Or Directly load the desired `parse`
  const {parse} = require('function-parser');

  //Simple usage
  parse('foo(1,"bar");foo(,"bar")')
  /*=> [
  {
    name: "foo",
    args: [
      1,
      "bar"
    ]
  },
  {
    name: "foo",
    args: [
      null,
      "bar"
    ]
  }
]*/
```

### Using TypeScript
```ts
  import {parse} from 'function-parser';

//Usage
  parse('test({"json works": "However, for best performance it is recommended not to use json"})')
  /*=> [
  {
    name: "test",
    args: [
     {
        "json works": "However, for best performance it is recommended not to use json"
      }
    ]
  }
]*/
```

## API

## License

  [MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/function-parser.svg
[npm-url]: https://npmjs.org/package/function-parser
[travis-image]: https://img.shields.io/travis/hisco/function-parser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/hisco/function-parser
[coveralls-image]: https://coveralls.io/repos/github/hisco/function-parser/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/hisco/function-parser?branch=master
