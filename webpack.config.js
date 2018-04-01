module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'bundle.js'
        },
        module:{
           rules:[
               {
                   test:/\.js$/,
                   exclude:/node_modules/,
                   loader:"babel-loader"
               },
               {
                   test: /\.css$/,
                   use: [ 'style-loader', 'css-loader' ]
               }
           ]
        },
        devtool:"source-map"
    }
    