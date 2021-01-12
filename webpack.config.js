// import dependencies
import path from 'path';
import css from "file.css";
import HtmlWebpackPlugin from 'html-webpack-plugin'

// consfig dependencies
module.exports = {
    entry: 'src/index.js',
    output: {
        path:path.resolve(__dirname, dist),
        filename: "bundle.js"

    },
    module: {
        rules : [
            {
                test:/\.(js|jsx)$/,              
                use: 'babel-loader'
            },
            {
                test:/\.css$/,              
                use:'css-loader'
            }
        ]
    },
    plugin: [
        new HtmlWebpackPlugin({template: './src/ibdex.html'})
    ],
    mode: 'production'
};