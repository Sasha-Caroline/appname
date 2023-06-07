const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    cache: {
        type: 'filesystem',
        compression: 'gzip',
        store: 'pack',
    },

    devServer: {
        compress: true,
    },

    watchOptions: {
        ignored: '/node_modules/',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
};
