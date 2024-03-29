const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isProductionBuild = env && env.production;

    return [{
        entry: './src/Widget.jsx',
        mode: 'production',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                }
            ],
        },
        devServer: {
            contentBase: bundleOutputDir
        },
        plugins: [new copyWebpackPlugin([{ from: 'demo/' }])]
    }];
};
