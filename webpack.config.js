var path=require('path');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let extract_css = new ExtractTextPlugin('css/[name].css'); //css抽取
let extract_vue_css = new ExtractTextPlugin('css/[name].vue.css');

var option = {
    entry: {
        login:'./web/src/pages/login/index.js',
        main: './web/src/pages/main/index.js'
    },
    output: {
        path: path.resolve('./web/dist'),
        publicPath: 'dist/',
        filename: 'js/[name].bundle.js'
    },
    cache: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue','.css','less','html','png','jpg'],
        // alias: {
        //     'vue': 'vue/dist/vue.js'
        // }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    less:extract_vue_css.extract({use:['vue-style-loader', 'css-loader', 'less-loader']}),
                    css:extract_vue_css.extract({use:['vue-style-loader', 'css-loader']})
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve('./web/src')],
                query: {
                    presets: ['es2015', 'stage-0']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: extract_css.extract({use:['style-loader','css-loader','autoprefixer-loader']})
            },
            {
                test: /\.less$/,
                loader: extract_css.extract({use:['style-loader','css-loader','less-loader','autoprefixer-loader']})
            },
            {
                test: /\.(?:jpg|png|gif)$/,
                loader: 'file-loader?name=./img/[name].[hash:6].[ext]'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=./iconfont/[name].[hash:6].[ext]'
            }
        ]
    },
    plugins:[
        extract_css,
        extract_vue_css,
        
        new HtmlWebpackPlugin({
            title:'login',
            filename:'../login.html',
            template:'./web/src/login.html',
            chunks: ['login'],
            hash:true,
            inject:true
        }),
        new HtmlWebpackPlugin({
            title:'main',
            filename:'../main.html',
            template:'./web/src/main.html',
            chunks:['main'],
            hash:true,
            inject:true
        })

    ]
}

if (process.env.NODE_ENV === 'production') {
    option.devtool = false
}

module.exports = option