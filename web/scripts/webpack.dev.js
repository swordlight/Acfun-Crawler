const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = {
  mode: 'development', //开发模式
  devtool: 'source-map', //调试
  target: 'web', //运行环境
  context: __dirname, //webapck主目录
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".less", ".css"]
  },

  entry: {
    'index': '../src/index.ts',
    'vender': '../src/vender.ts'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '../dist'
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../typescript.json') //指定tsconfig的据对路径，不然会报错
        },
        include: [
          path.resolve(__dirname, '../src')
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'less-loader'}
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|img|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          fileName: '/img/[name].[ext]?v=[hash:6]?'
        }
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin('/css/[name].css?v=[hash:6]')
  ]
}


module.exports = config