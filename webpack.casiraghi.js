const path = require('path')
const CssPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '..', 'casiraghi', 'webroot'),
        filename: 'index.bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|svg|gif|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'imgs',
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [CssPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CssPlugin({
            filename: 'css/styles.css',
        }),
    ],
}
