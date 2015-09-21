import TinyTrait from '../tiny-trait.js';
import Serializable from './Serializable.js';

class DemoClass {

	constructor() {

		TinyTrait.acquire( this, Serializable );

	}

	testFunction() {
		alert( 'Hello!' );
	}

}

let demoObj = new DemoClass();

demoObj.a = 'a';
demoObj.b = 2;
demoObj.c = function() {
	alert( 'C' );
};

let serializedData = JSON.parse( demoObj.serialize() );

console.log( serializedData );

console.log( serializedData.a === 'a' );
console.log( serializedData.b === 2 );
console.log( typeof serializedData.c === 'undefined' );
console.log( typeof serializedData.testFunction === 'undefined' );

console.log( TinyTrait.hasTrait( demoObj, Serializable ) );
console.log( TinyTrait.hasTrait( demoObj, 'Serializable' ) );

console.log( Serializable.existsIn( demoObj ) );