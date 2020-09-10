const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: common.output.path,
		watchContentBase: true,
		port: 9000,
		hot: true,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
});
