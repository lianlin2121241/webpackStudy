const webpack=require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')

module.exports = {
    devtool:'source-map',
    entry:__dirname + "/app/main.js",
    output:{
        path:__dirname+"/public",
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
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader"
                },
                exclude:/node_nodules/
            },
            {
                test: /(\.css)$/,
                use:[
                    {
                        loader:"style-loader"
                    },{
                        loader:"css-loader",
                        options:{
                            modules:true,                                       // 指定启用css modules
                            localIdentName:'[name]__[local]--[hash:base64:5]'   // 指定css的类名格式
                        }
                    },{
                        loader:"postcss-loader"
                    },{
                        loader:"less-loader"
                    }
                ]
            },
            {
                test: /(\.less)$/,
                use:[
                    {
                        loader:"style-loader"
                    },{
                        loader:"css-loader"
                    },{
                        loader:"postcss-loader"
                    },{
                        loader:"less-loader"
                    }
                ]
            },
            {
                test: /(\.scss)$/,
                use:[
                    {
                        loader:"style-loader"
                    },{
                        loader:"css-loader"
                    },{
                        loader:"postcss-loader"
                    },{
                        loader:"sass-loader"
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({ //通过模板生成html
            template:__dirname + "/app/index.tmpl.html" ///new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()    //热加载插件
    ]
}