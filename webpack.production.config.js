const webpack=require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    devtool:'null', //注意修改了这里，这能大大压缩我们的打包代码
    entry:__dirname + "/app/main.js",
    output:{
        path:__dirname+"/build",
        filename:"bundle-[hash].js"
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
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:"css-loader",
                        options:{
                            modules:true,                                       // 指定启用css modules
                            localIdentName:'[name]__[local]--[hash:base64:5]'   // 指定css的类名格式
                        }
                    },{
                        loader:"postcss-loader"
                    }
                ]
            },
            {
                test: /(\.less)$/,
                use:ExtractTextPlugin.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },{
                            loader:"postcss-loader"
                        },{
                            loader:"less-loader"
                        }
                    ],
                    fallback:"style-loader"
                })
            },
            {
                test: /(\.scss)$/,
                use:ExtractTextPlugin.extract({
                    use:[
                        {
                            loader:"css-loader"
                        },{
                            loader:"postcss-loader"
                        },{
                            loader:"sass-loader"
                        }
                    ],
                    fallback:"style-loader"
                })
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({ //通过模板生成html
            template:__dirname + "/app/index.tmpl.html" ///new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("style.css"),     //将可编译型的样式文件提取 less sass
        new MiniCssExtractPlugin({      //将css文件提取
            filename:"[name].css",
            chunkFilename:"[id].css"
        }),
        new CleanWebpackPlugin('build/*.*',{    //打包时先清空目录
            root:__dirname,
            verbose:false,
            dry:false
        })
    ]
}