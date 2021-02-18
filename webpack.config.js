const path = require('path');
const fileGetter = require('./webpack/functions/get-files');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const mafiosoImageFiles = fileGetter.getFiles('./src/game/img');

const mafiosoFiles = [
    './src/game/css/import.scss',
    './src/game/js/import.js',
    './src/game/css/components/font/pixel-font.eot',
    './src/game/css/components/font/pixel-font.svg',
    './src/game/css/components/font/pixel-font.ttf',
    './src/game/css/components/font/pixel-font.woff',
    './src/game/css/components/font/pixel-font.woff2'
];

mafiosoFiles.concat(mafiosoImageFiles);

module.exports = {
    entry: {
        mafiosogame: mafiosoFiles
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].build.js'/*,
        publicPath: '/dist/'*/
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                //type: 'asset/resource'
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[hash:16].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                //type: 'asset/resource'
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[hash:16].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.html$/i,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/i,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/game/view/index.html',
            filename: './index.html',
            minify: false,
            favicon: './src/game/img/favicon/favicon.ico'
        })
    ]
}