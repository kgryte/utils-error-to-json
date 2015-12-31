'use strict';

// MODULES //

var getKeys = require( 'object-keys' );


// TOJSON //

/**
* FUNCTION: toJSON( err )
*	Returns a JSON representation of an error object.
*
* @param {Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|RangeError|EvalError} err - error to serialize
* @returns {Object} JSON representation
*/
function toJSON( err ) {
	var keys;
	var out;
	var i;
	if ( !( err instanceof Error ) ) {
		throw new TypeError( 'invalid input argument. Must provide an error object. Value: `' + err + '`.' );
	}
	// Build a JSON object representing an error (similar to how Buffer objects are represented: https://nodejs.org/api/buffer.html#buffer_buf_tojson)
	out = {};

	// Guaranteed properties:
	out.type = 'Error'; // TODO
	out.message = err.message;

	// Optional general error properties...
	if ( err.name ) {
		out.name = err.name;
	}
	if ( err.stack ) {
		out.stack = err.stack;
	}
	// Optional Node.js (system error) properties...
	if ( err.code ) {
		out.code = err.code;
	}
	if ( err.errno ) {
		out.errno = err.errno;
	}
	if ( err.syscall ) {
		out.syscall = err.syscall;
	}
	// Any enumerable properties...
	keys = getKeys( err );
	for ( i = 0; i < keys.length; i++ ) {
		out[ keys[i] ] = err[ keys[i] ];
	}
	return out;
} // end FUNCTION toJSON()


// EXPORTS //

module.exports = toJSON;
