toJSON
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns a [JSON][json] representation of an [error][js-error] object.


## Installation

``` bash
$ npm install utils-error-to-json
```


## Usage

``` javascript
var toJSON = require( 'utils-error-to-json' );
```

#### toJSON()

Returns a [JSON][json] representation of an [`error`][js-error] object.

``` javascript
var err = new Error( 'beep' );

var json = toJSON( err );
/*
  {
	"type": "Error",
	"name": "Error", // if present
	"message": "beep",
	"stack": "<stack>" // if present
  }
*/
```

The [JSON][json] `object` is __guaranteed__ to have the following properties:

*	__type__: error type
*	__message__: error message

The __only__ standardized cross-platform property is `message`. Depending on the platform, the following properties __may__ be present:

*	__name__: error name
*	__stack__: stack trace
*	__code__: error code ([Node.js][node-system-error] system errors)
*	__errno__: error code `string` ([Node.js][node-system-error] system errors)
*	__syscall__: `string` representing the failed system call ([Node.js][node-system-error] system errors)

The `function` also serializes __all__ `enumerable` properties.

``` javascript
var err = new Error( 'beep' );
err.a = 'b';
err.c = { 'd': 'e' };

var json = toJSON( err );
/*
  {
	"type": "Error",
	"name": "Error", // if present
	"message": "beep",
	"stack": "<stack>", // if present
	"a": "b",
	"c": {
      "d": "e"
    }
  }
*/
```


## Notes

*	Supported built-in [`error`][js-error] types:
	-	[`Error`][js-error]
	-	[`TypeError`][js-type-error]
	-	[`SyntaxError`][js-syntax-error]
	-	[`ReferenceError`][js-reference-error]
	-	[`RangeError`][js-range-error]
	-	[`URIError`][js-uri-error]
	-	[`EvalError`][js-eval-error]
*	The implementation supports custom error types and sets the `type` field to the closest built-in [`error`][js-error] type.
	
	``` javascript
	function CustomError( msg ) {
		this.name = 'CustomError';
		this.message = msg || '';
		this.stack = ( new TypeError() ).stack;
		return this;
	}
	CustomError.prototype = Object.create( TypeError.prototype );
	CustomError.prototype.constructor = CustomError;

	var err = new CustomError( 'boop' );

	var json = toJSON( err );
	/*
	  {
	    "type": "TypeError",
	    "name": "CustomError", 
	    "message": "boop",
	    "stack": "<stack>"
	  }
	*/
	```


## Examples

``` javascript
var toJSON = require( 'utils-error-to-json' );

var err = new Error( 'beep' );
console.log( toJSON( err ) );
/*
  {
	"type": "Error",
	"name": "Error",
	"message": "beep",
	"stack": "<stack>"
  }
*/

err = new TypeError( 'invalid type' );
console.log( toJSON( err ) );
/*
  {
	"type": "TypeError",
	"name": "TypeError",
	"message": "invalid type",
	"stack": "<stack>"
  }
*/

err = new SyntaxError( 'bad syntax' );
console.log( toJSON( err ) );
/*
  {
	"type": "SyntaxError",
	"name": "SyntaxError",
	"message": "bad syntax",
	"stack": "<stack>"
  }
*/

err = new ReferenceError( 'unknown variable' );
console.log( toJSON( err ) );
/*
  {
	"type": "ReferenceError",
	"name": "ReferenceError",
	"message": "unknown variable",
	"stack": "<stack>"
  }
*/

err = new URIError( 'bad URI' );
console.log( toJSON( err ) );
/*
  {
	"type": "URIError",
	"name": "URIError",
	"message": "bad URI",
	"stack": "<stack>"
  }
*/

err = new RangeError( 'value out-of-range' );
console.log( toJSON( err ) );
/*
  {
	"type": "RangeError",
	"name": "RangeError",
	"message": "value out-of-range",
	"stack": "<stack>"
  }
*/

err = new EvalError( 'eval error' );
console.log( toJSON( err ) );
/*
  {
	"type": "EvalError",
	"name": "EvalError",
	"message": "eval error",
	"stack": "<stack>"
  }
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-error-to-json.svg
[npm-url]: https://npmjs.org/package/utils-error-to-json

[build-image]: http://img.shields.io/travis/kgryte/utils-error-to-json/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-error-to-json

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-error-to-json/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-error-to-json?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-error-to-json.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-error-to-json

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-error-to-json.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-error-to-json

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-error-to-json.svg
[github-issues-url]: https://github.com/kgryte/utils-error-to-json/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[json]: http://www.json.org/
[js-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[js-type-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
[js-syntax-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
[js-range-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
[js-reference-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError
[js-uri-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError
[js-eval-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError
[node-error]: https://nodejs.org/api/errors.html
[node-system-error]: https://nodejs.org/api/errors.html#errors_class_system_error
