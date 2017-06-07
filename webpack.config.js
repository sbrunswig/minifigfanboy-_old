const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: {
        main: './main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map', 
    module: {
        loaders: [
         
            /* vue loder for converting vue to js */
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            /* vue loader for conveting css to js */         
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',
                    'postcss-loader'
                ]
            }
        ]   
    }, 
    plugins: [
        new CopyWebpackPlugin([
            { from: './index.html' },
            { from: 'assets/img', to: 'img' }
        ])
    ]    
}