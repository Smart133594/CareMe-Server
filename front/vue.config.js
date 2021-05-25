const path = require('path');
const webpack = require('webpack');

module.exports = {
    outputDir: '../public',
    indexPath: process.env.NODE_ENV === 'production' ? '../resources/views/index.blade.php' : 'index.html',
    css: {
        sourceMap: true
    },
    productionSourceMap: false,
    transpileDependencies: [
        'vuetify',
        'vue2-dropzone',
        'vue-echarts',
        'resize-detector'
    ],
    configureWebpack: {
        resolve: {
            alias: {
                Api: path.resolve(__dirname, 'src/api/'),
                Components: path.resolve(__dirname, 'src/components/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Container: path.resolve(__dirname, 'src/container/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Helpers: path.resolve(__dirname, 'src/helpers/'),
                Themes: path.resolve(__dirname, 'src/themes/')
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        plugins: [
            //jquery plugin
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    }
}
