/**webpack.config.js
 * Created by Intel on 2016/12/10 0010.
 */
var path=require("path");
var webpack=require("webpack");
var HtmlWebpackPlugin=require("html-webpack-plugin");
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-no-physics.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var detect=path.join(__dirname,'/springBall/assets/src/detect-min.js');

module.exports={
    devtool:'cheap-source-map', //调试资源示意
    entry:{
        app: [
            path.resolve(__dirname,"./springBall/main.js")
        ],
        vendor: ['pixi','phaser']
    }
    ,
    output:{
        path:__dirname + "/build",
        filename:"[name]-[hash].js"
    },
    devServer:{
        colors:true,  //输出的结果有颜色，
        historyApiFallback:true,//不进行跳转
        host:'0.0.0.0'
    },
    module:{
        loaders:[
            {
              test:/\.json$/,
                loader:'json'
            },
            {
                test:/\.js$/,
                exclude:/node-modules/,
                loader:'babel'
            },
            {
                test:/\.(png|jpg)$/,
                loader: 'url-loader?limit=1024&name=[name].[ext]'
            },
            { test: /pixi\.js$/, loader: 'expose?PIXI' },
            { test: /phaser-no-physics\.js$/, loader: 'expose?Phaser' }
        ]
    },
    resolve: {
        alias: {
            'pixi': pixi,
            'phaser': phaser
        }
    },
    plugins:[
        new webpack.BannerPlugin('Copyright Flying Ezhandi inc.'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            template:__dirname+"/springBall/view/index.html"
        })
    ]
}
