const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				extractComments: true,
				parallel: true,
				cache: true,
			}),
			new CssMinimizerPlugin({
				parallel: true,
				cache: true,
				minimizerOptions: {
					preset: [
						'advanced',
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
});
