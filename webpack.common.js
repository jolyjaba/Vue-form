const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';

const COMMON_PATH = {
	src: './src',
	dist: './dist',
};

module.exports = {
	entry: { bundle: `${COMMON_PATH.src}/js/index` },
	output: {
		filename: `scripts/${devMode ? '[name].js' : '[name].[hash].js'}`,
		path: path.resolve(__dirname, COMMON_PATH.dist),
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new MiniCssExtractPlugin({
			filename: `styles/${devMode ? '[name].css' : '[name].[hash].css'}`,
			chunkFilename: `styles/${devMode ? '[id].css' : '[id].[hash].css'}`,
		}),
		new HtmlWebpackPlugin({
			template: `${COMMON_PATH.src}/index.html`,
		}),
	],
	resolve: {
		extensions: ['.vue', '.js', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.(csv|tsv)$/,
				use: ['csv-loader'],
			},
			{
				test: /\.xml$/,
				use: ['xml-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
							outputPath: 'assets/fonts',
						},
					},
				],
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
							outputPath: 'assets/svg',
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					'vue-style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: devMode,
						},
					},
					{ loader: 'css-loader', options: { url: true, importLoaders: 3 } },
					{
						loader: 'postcss-loader',
						options: {
							plugins: [autoprefixer, postcssPresetEnv],
						},
					},
					'resolve-url-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: devMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
							outputPath: 'assets/images',
							esModule: false,
						},
					},
					{
						loader: 'image-webpack-loader',
						...(!devMode && {
							options: {
								mozjpeg: {
									progressive: true,
									quality: 65,
								},
								// optipng.enabled: false will disable optipng
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: [0.65, 0.9],
									speed: 4,
								},
								gifsicle: {
									interlaced: false,
								},
								// the webp option will enable WEBP
								webp: {
									quality: 75,
								},
							},
						}),
					},
				],
			},
		],
	},
};
