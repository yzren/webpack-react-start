var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var htmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

console.log(process.env.npm_lifecycle_event)

module.exports = {
	devServer: {
		historyApiFallback : true,
		port: 3004,
		hot : true,
		inline : true
	},
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:3004',
		'webpack/hot/only-dev-server',
		'./src/app.js',
	],
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'main.js',
	},
	module: {
		loaders: [

			// 转换jsx 
			{
				test: /\.js[x]?/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015']
			},
			// css 编译 && 模块化 
			{
				test: /\.scss$/,
				loaders: [
					'isomorphic-style-loader',
					'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
					'postcss-loader'
				]
			},
			// 图片处理
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=9182'
			}

		]
	},

	// 省去后缀 如 import xx.js  可直接 import xx 
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	postcss: function() {
		return [
			require('precss'),
			require('autoprefixer'),
		]
	},
	plugins: [
		// 生成html文件
		new htmlWebpackPlugin({
			template: 'node_modules/html-webpack-template/index.ejs',
			title: 'My App',
			baseHref: 'http://localhost:3004/',
			mobile: true,
			appMountId: 'app',
			inject: false,
			// minify : true
		}),
		// JS 压缩
		new uglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		// new CommonsChunkPlugin('init.js')
	]
}