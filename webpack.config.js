var path=require('path');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let extract_css = new ExtractTextPlugin({filename:'css/[name].css',allChunks:true}); //css抽取   基于公共输出路径 web/dist/
let extract_vue_css = new ExtractTextPlugin({filename:'css/vue/[name].vue.css',allChunks:true}); //vue的css抽取

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
                use:[{
                    loader: 'vue-loader',
                    // options:{
                    //     loaders:{  //抽取vue中css
                    //         less:extract_vue_css.extract({
                    //             use:['css-loader','less-loader']
                    //         }),
                    //         css:extract_vue_css.extract({
                    //             use:['css-loader']
                    //         })
                    //     }
                        
                    // }
                }]
            },
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','stage-2']
                    },
                }]
            },
            {
                test: /\.css$/,
                use:extract_css.extract({
                    fallback:'style-loader',
                    use:['css-loader','autoprefixer-loader']
                })
            },
            {
                test: /\.less$/,
                use:extract_css.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader','autoprefixer-loader']
                })
            },
            {
                test: /\.(?:jpg|png|gif)$/,
                use:[{
                    loader:'file-loader?name=img/[name].[hash:6].[ext]'
                }]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                use:[{
                    loader:'file-loader?name=iconfont/[name].[hash:6].[ext]'
                }]
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

if (process.env.NODE_ENV === 'production') {   //开发环境
    option.devtool = false
}

module.exports = option