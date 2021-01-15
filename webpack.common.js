const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		// path: path.resolve(__dirname, '..', 'casiraghi', 'webroot'),
		filename: 'index.bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						attributes: {
							list: [
								{
									tag: 'img',
									attribute: 'src',
									type: 'src',
								},
							],
						},
					},
				},
			},
			{
				test: /\.(jpg|jpeg|svg|gif|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'imgs',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlPlugin({
			template: './src/assets/src-index.html',
			filename: 'index.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-categorie.html',
			filename: 'categorie.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-product-detail.html',
			filename: 'product-detail.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-cart.html',
			filename: 'cart.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-checkout.html',
			filename: 'checkout.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-slider.html',
			filename: 'slider.html',
		}),
		new HtmlPlugin({
			template: './src/assets/src-multistep-form.html',
			filename: 'multistep-form.html',
		}),
	],
}
