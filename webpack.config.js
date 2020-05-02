'use strict';
const path = require('path');

module.exports = {
	context: __dirname ,
	mode: "development",
	entry: ['babel-polyfill', './public/main.ts'],
	output:{
		path: path.resolve(__dirname ,'packed'),
		filename: '\main.js',
		publicPath: './',
	},
	devServer : {
		historyApiFallback: true,
		rewrites: [
			{ from: /\//, to: '/index.html'}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
		alias: {
			'@utils':  path.resolve(__dirname ,'public/utils'),
			'@handlers':  path.resolve(__dirname ,'public/handlers'),
			'@queries':  path.resolve(__dirname ,'public/backendQueries'),
			'@components': path.resolve(__dirname ,'public/components'),
		},
	},

	module:{
		rules:  [
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							[
								"@babel/plugin-proposal-class-properties"
							]
						]
					}
				}
			},
			{ test: /\.tsx?$/,
				loader: "ts-loader" },
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',

			},
			{
				test: /\.pug$/,
				loader: "pug-loader"

			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							webpackImporter: false,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test:  /\.(png|svg|jpe?g|gif)$/,
				loader: 'file-loader',

			}]
	}

};