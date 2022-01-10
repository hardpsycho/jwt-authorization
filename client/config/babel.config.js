let babelPlugins = [
    ["@babel/plugin-transform-runtime", {"regenerator": true}]
]

if (process.env.NODE_ENV === "development"){
    babelPlugins.push("react-refresh/babel")
}

module.exports = {
    presets: ["@babel/preset-env",
        ["@babel/preset-react", {runtime: "automatic"}]
    ],
    plugins: babelPlugins
}
