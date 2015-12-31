'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var toJSON = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof toJSON === 'function', 'main export is a function' );
	t.end();
});
