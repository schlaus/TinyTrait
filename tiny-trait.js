let ttp = Symbol( 'tiny-trait properties' );

export default class TinyTrait {

	static existsIn( object ) {
		return TinyTrait.hasTrait( object, this );
	}

	static applyTo( implementor, overwrite, settings ) {

		let propertyNames = Object.getOwnPropertyNames( this.prototype );
		let i, propCount;

		if ( !implementor[ ttp ] ) {
			implementor[ ttp ] = {};
		}

		if ( !implementor[ ttp ].traits ) {
			implementor[ ttp ].traits = new Set();
		}

		for ( i = 0, propCount = propertyNames.length; i < propCount; i++ ) {
			let property = propertyNames[ i ];
			if ( property !== 'constructor' && property !== 'traitInitializer' ) {
				if ( typeof implementor[ property ] === 'undefined' || overwrite ) {
					implementor[ property ] = this.prototype[ property ].bind( implementor );
				}
			}
		}

		implementor[ ttp ].traits.add( this.name );

		if ( this.prototype.traitInitializer ) {
			this.prototype.traitInitializer.call( implementor, settings );
		}
	}

	static acquire( implementor, ...traits ) {

		let postInitializers = [];

		for ( let trait of traits ) {

			if ( trait instanceof Array ) {
				trait[ 0 ].applyTo( implementor, false, trait[ 1 ]);
				trait = trait[ 0 ];
			} else {
				trait.applyTo( implementor );
			}

			if ( trait.prototype.traitPostInit ) {
				postInitializers.push( trait.prototype.traitPostInit );
			}
		}

		for ( let init of postInitializers ) {
			init.apply( implementor );
		}
	}

	static hasTrait( object, trait ) {

		if ( typeof trait !== 'string' ) {
			trait = trait.name;
		}

		return object[ ttp ] && object[ ttp ].traits && object[ ttp ].traits.has( trait );

	}

}