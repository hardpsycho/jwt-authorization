const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// указываем пусть к browserlistrc
process.env.BROWSERSLIST_CONFIG = path.resolve(__dirname, ".browserslistrc")

let mode = "none"; // "production" | "development" | "none"
const defaultHtmlFile = "./src/index.html" // path to the html template

let plugins = [
    new MiniCssExtractPlugin(),
    new htmlWebpackPlugin({template: defaultHtmlFile, inject: 'body'}),
]

if(process.env.NODE_ENV === "production"){
    mode = "production";
    plugins.push(
        new FaviconsWebpackPlugin({
            logo: path.resolve('./src/assets/favicon/icon.jpg') || "",
            outputPath: './assets/favicons/',
            //inject: htmlPlugin => path.basename(htmlPlugin.options.filename) === defaultHtmlFile,
            favicons: {
                appName: 'my-app',
                appDescription: 'My awesome App',
                developerName: 'HardDev',
                developerURL: null, // prevent retrieving from the nearest package.json
                background: '#ddd',
                theme_color: '#333',
                icons: {
                    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
                    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
                    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
                    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
                    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
                    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
                }
            }
        })
    )
}
else if (process.env.NODE_ENV === "development"){
    mode = "development";
    plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../build"),
        clean: true
    },
    mode: mode,
    target: "web",
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader"
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {loader: "postcss-loader", options: {postcssOptions: { config: path.resolve(__dirname, "postcss.config.js")}}},
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options:{
                        configFile: "./config/babel.config.js"
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {'@mui/styled-engine': '@mui/styled-engine-sc'},
    },
    devtool: "source-map",
    plugins: plugins,
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true,
        open: true
    }
}