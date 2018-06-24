const webpack=require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')

module.exports = {
    devtool:'source-map',
    entry:__dirname + "/appOnlyJsWebpack/main.js",
    output:{
        path:__dirname+"/publicAppOnlyJsWebpack",
        filename:"bundle.js"
    },
    devServer:{
        contentBase:"./",     //本地服务器所加载的页面所在的目录
        historyApiFallback:true,    //不跳转
        inline:true,                 //实时刷新
        hot:true    //热加载
    },
    module: {
        rules:[
            {
                test:/(\.js)$/,
                use:{
                    loader:"babel-loader"
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究')
    ]
}