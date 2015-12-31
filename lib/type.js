'use strict';

// MODULES //

var CTORS = require( './ctors.js' );


// TYPE NAME //

/**
* FUNCTION: typeName( error )
*	Returns the error type.
*
* @param {Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|RangeError|EvalError} error - input error
* @returns {String} error type
*/
function typeName( error ) {
	var i;
	for ( i = 0; i < CTORS.length; i++ ) {
		if ( error instanceof CTORS[ i ][ 0 ] ) {
			return CTORS[ i ][ 1 ];
		}
	}
} // end FUNCTION typeName()


// EXPORTS //

module.exports = typeName;
