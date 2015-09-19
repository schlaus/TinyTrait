import TinyTrait from '../TinyTrait.js';

let privateProperties = Symbol( 'Private properties for Serializable-trait' );

export default class Serializable extends TinyTrait {

	traitInitializer() {
		console.log( 'Initializer' );
		if ( typeof this.serializable === 'undefined' ) {
			this.serializable = true;
		}
	}

	traitPostInit() {
		console.log( 'Post init' );
	}

	serialize() {

		let data = {};

		if ( this.serializable ) {
			let properties = Object.getOwnPropertyNames( this );
			for ( let prop of properties ) {
				if ( typeof prop !== 'function' ) {
					data[ prop ] = this[ prop ];
				}
			}
		}

		return JSON.stringify( data );
	}

	unserialize( data ) {

		data = JSON.parse( data );

		for ( let prop in data ) {
			if ( data.hasOwnProperty( prop ) ) {
				this[ prop ] = data[ prop ];
			}
		}

	}

}