let common = require('./webpack.common.js')
let merge = require('webpack-merge')

let dev = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	devServer: {
		contentBase: './src/assets',
		watchContentBase: true,
		hot: true,
		host: '0.0.0.0',
	},
}

module.exports = merge(common, dev)
