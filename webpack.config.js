const path = require('path')

module.exports = {
    // entry: './src/index.ts',
    // output: {
    //     filename: 'index.js',
    //     path: path.resolve(__dirname, 'lib'),
    //     library: 'margoParser',
    //     libraryTarget: 'umd',
    // },
    entry: {
        index: './src/index.ts',
        grammar: './src/grammar.ts',
        parser: './src/parser.ts',
        api: './src/api.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'lib'),
        library: 'MargoParser',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.m?[t|j]s$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.ne$/i,
                use: 'raw-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
