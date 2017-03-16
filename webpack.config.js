
var option = {
    // entry: entry,
    // output: {
    //     path: path.resolve('./web/dist'),
    //     publicPath: 'dist/',
    //     filename: 'js/[name].js'
    // },
    cache: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
        }, {
            test: /\.(?:jpg|gif|png)$/,
            loader: 'file?name=img/[name].[hash:6].[ext]'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/main.css'),
        new HtmlWebpackPlugin({
            filename: '../main.html',
            template: './web/src/main.html',
            inject: true,
            hash: true
        })
    ],
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css')
        }
    }
}

if (process.env.NODE_ENV == 'production') {
    option.devtool = false
}

module.exports = option