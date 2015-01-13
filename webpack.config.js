module.exports = {
    entry: './src/js/app',
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'js/app.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            // Ignore node packages
            exclude: /node_modules\//,
            loader: '6to5?experimental'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.png$/,
            loader: 'file?name=img/[hash].[ext]'
        }]
    }
};
