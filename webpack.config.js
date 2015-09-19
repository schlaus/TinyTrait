var webpack = require( 'webpack' );

module.exports = {

	entry  : './example/demo.js',
	output : {
		path     : './example',
		filename : 'demo-transpiled.js'
	},
	module : {
		loaders : [
			{
				test    : /\.js$/,
				exclude : /node_modules/,
				loader  : 'babel',
				query   : {
					loose    : 'all',
					optional : [ 'runtime' ],
					stage    : 0
				}
			}
		]
	}
};