const webpack = require('webpack');
const path = require('path');
const process = require('process');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, 'config');

try {
    const config = require(configPath);
} catch (error) {
    console.error("Error loading configuration:", error.message);
    console.info(`Make sure you have created config/${NODE_ENV}.js`)
    process.exit(1);
}

const extractCSSPlugin = new ExtractTextPlugin({
    filename: '[name].bundle.[contenthash].css',
    allChunks: true
});

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            'manifest.json',
            path.resolve(__dirname, 'src', 'js', 'globals.js'),
            path.resolve(__dirname, 'src', 'js', 'index.js')
        ]
    },
    output: {
        filename: '[name].bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'out'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'bower_components'),
                    path.resolve(__dirname, 'node_modules'),
                ],
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'node_modules', 'react-polymer'),
                    path.resolve(__dirname, 'node_modules', 'polymer-webpack-loader')
                ],
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: ['babel-loader', 'polymer-webpack-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: extractCSSPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ])
            },
            {
                test: /manifest\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'manifest.json',
                        }
                    },
                    {
                        loader: 'web-app-manifest-loader'
                    }
                ]
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /\.(eot|woff2|woff|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash]',
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src', 'js'),
            path.resolve(__dirname, 'src', 'scss'),
            path.resolve(__dirname, 'bower_components'),
            path.resolve(__dirname, 'node_modules')
        ],
        alias: {
            config: configPath,
            "manifest.json": path.join(__dirname, 'src', 'manifest.json')
        }
    },
    plugins: [
        new HtmlPlugin({
            title: 'Pathways Mobile Application',
            template: 'src/index.html.ejs',
            filename: 'index.html',
            hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                if (module.context) {
                    return module.context.includes('node_modules') || module.context.includes('bower_components');
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new CopyWebpackPlugin([
            {
                from: 'static'
            },
            {
                from: '.htaccess',
                context: 'src'
            }
        ]),
        extractCSSPlugin,
        // Fix a warning with webcomponentsjs
        // <https://github.com/webcomponents/webcomponentsjs/issues/794>
        new webpack.IgnorePlugin(/vertx/)
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "out"),
        inline: true,
        historyApiFallback: true,
        stats: {colors: true}
    },
    devtool: 'sourcemap'
};