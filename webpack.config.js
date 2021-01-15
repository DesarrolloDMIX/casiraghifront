const path = require('path')
const CssPlugin = require('mini-css-extract-plugin')
let common = require('./webpack.common.js')
let merge = require('webpack-merge')

let basic = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [CssPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new CssPlugin({
			filename: 'styles.css',
			// filename: 'css/styles.css',
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
	},
}

module.exports = merge(common, basic)
