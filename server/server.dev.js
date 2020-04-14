const path = require("path");

// Provide custom regenerator runtime and core-js
require("babel-polyfill");

// Node babel source map support
// require('source-map-support').install()

/**
 * 引入多个钩子（hook）来帮助服务端去解析它所不支持的文件或语法
 */

const config = require("../build/webpack.dev.config");
// 增加花名
require("module-alias").addAliases(config.resolve.alias);

const fs = require("fs");
// Babel
require("babel-register")(JSON.parse(fs.readFileSync("./.babelrc")));

// CSS钩子
require("css-modules-require-hook")({ extensions: [".css"] });

// LESS钩子
require("css-modules-require-hook")({
  extensions: [".less"],
  // // postcss文档：http://api.postcss.org/postcss.html
  preprocessCss: (css, filename) =>
    require("postcss")([require("postcss-modules-values")]).process(css, {
      from: filename,
    }).css,
  processorOpts: { parser: require("postcss-less").parse },
  camelCase: true,
  generateScopedName: "[name]__[local]__[hash:base64:8]", // 必需与webpack.dev.config中定义的localIdentName一样
  resolve: {
    alias: config.resolve.alias,
  },
});

// 静态资源（图片）钩子
require("asset-require-hook")({
  name: "/[hash].[ext]",
  extensions: ["jpg", "png", "gif", "webp", "svg"],
  limit: 8000,
});

const app = require("./app.js"),
  views = require("koa-views"),
  apiRoute = require("./routes/apiRoute"),
  viewRoute = require("./routes/viewRoute"),
  port = process.env.port || 80,
  convert = require("koa-convert"),
  webpack = require("webpack"),
  compiler = webpack(config),
  devMiddleware = require("koa-webpack-dev-middleware"),
  hotMiddleware = require("koa-webpack-hot-middleware");
compiler.plugin("emit", (compilation, callback) => {
  const assets = compilation.assets;
  let file, data;
  Object.keys(assets).forEach((key) => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, key);
      data = assets[key].source();
      fs.writeFileSync(file, data);
    }
  });
  callback();
});
app.use(
  views(path.resolve(__dirname, "../views/dev"), { map: { html: "ejs" } })
);
app.use(
  convert(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    })
  )
);
app.use(convert(hotMiddleware(compiler)));
app.use(viewRoute);
app.use(apiRoute.routes());
app.use(apiRoute.allowedMethods());

app.listen(port);
