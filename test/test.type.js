'use strict';

// MODULES //

var test = require( 'tape' );
var typeName = require( './../lib/type.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof typeName === 'function', 'export is a function' );
	t.end();
});

test( 'if not provided an error instance, the function returns null', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		null,
		NaN,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.equal( typeName( values[ i ] ), null, 'returns `null` when provided a ' + ( typeof values[ i ] ) );
	}
	t.end();
});

test( 'if provided an error or error subclass, the function returns the closest error type', function test( t ) {
	var expected;
	var values;
	var i;

	values = [
		new Error( 'beep' ),
		new SyntaxError( 'boop' ),
		new TypeError( 'bop' ),
		new URIError( 'bap' ),
		new ReferenceError( 'bip' ),
		new EvalError( 'bup' ),
		new RangeError( 'bep' )
	];

	expected = [
		'Error',
		'SyntaxError',
		'TypeError',
		'URIError',
		'ReferenceError',
		'EvalError',
		'RangeError'
	];

	for ( i = 0; i < values.length; i++ ) {
		t.equal( typeName( values[i] ), expected[ i ], 'returns the constructor name: ' + expected[ i ] );
	}
	t.end();
});
