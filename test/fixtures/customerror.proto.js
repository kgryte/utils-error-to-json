'use strict';

/**
* FUNCTION: createClass( ctor )
*	Creates a CustomError class.
*
* @param {Error|SyntaxError|ReferenceError|EvalError|RangeError|TypeError|URIError} ctor - error constructor
* @returns {CustomError} constructor
*/
function createClass( ctor ) {
	if ( !ctor ) {
		ctor = Error;
	}
	/**
	* FUNCTION: CustomError( msg )
	*	Create a new object, which prototypically inherits from the Error constructor.
	*
	* @constructor
	* @param {String} msg - error message
	* @returns {CustomError} custom error instance
	*/
	function CustomError( msg ) {
		/* jshint newcap:false */
		this.name = 'CustomError';
		if ( msg ) {
			this.message = msg;
		}
		this.stack = ( new ctor() ).stack;
		return this;
	} // end FUNCTION CustomError()

	/**
	* Create a prototype which inherits from the parent prototype.
	*/
	CustomError.prototype = Object.create( ctor.prototype );

	/**
	* Set the constructor.
	*/
	CustomError.prototype.constructor = CustomError;

	return CustomError;
} // end FUNCTION createClass()


// EXPORTS //

module.exports = createClass;
