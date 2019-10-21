// Provide custom regenerator runtime and core-js
require('babel-polyfill')

// Node babel source map support
require('source-map-support').install()



const fs = require('fs');
require('babel-register')(JSON.parse(fs.readFileSync('./.babelrc')));



// Css require hook
require('css-modules-require-hook')({extensions: ['.css']});
require('css-modules-require-hook')({
    extensions: ['.less'],
    preprocessCss:function(css,filename){
        let cssString=css;
        require('postcss')([require('postcss-modules-values')])
            .process(css,{from:filename})
            .then(result=>cssString=result.css);
        return cssString;
    },
    processorOpts: {parser: require('postcss-less').parse},
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
});

// Image require hook
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp','svg'],
    limit: 8000
});

const path = require('path'),
    app = require('./app.js'),
    views = require('koa-views'),
    apiRoute = require('./routes/apiRoute'),
    viewRoute = require('./routes/viewRoute'),
    port = process.env.port || 80,
    convert = require('koa-convert'),
    webpack = require('webpack'),
    config = require('../build/webpack.dev.config'),
    compiler = webpack(config),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('koa-webpack-hot-middleware');
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;
    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}))
app.use(viewRoute)
app.use(apiRoute.routes())
app.use(apiRoute.allowedMethods())
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})))
app.use(convert(hotMiddleware(compiler)))
app.listen(port)