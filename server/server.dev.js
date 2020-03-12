const path = require("path");

// Provide custom regenerator runtime and core-js
require("babel-polyfill");

// Node babel source map support
// require('source-map-support').install()

const fs = require("fs");
require("babel-register")(JSON.parse(fs.readFileSync("./.babelrc")));

// Css require hook
require("css-modules-require-hook")({ extensions: [".css"] });
require("css-modules-require-hook")({
  extensions: [".less"],
  preprocessCss: (css, filename) =>
    require("postcss")([require("postcss-modules-values")]).process(css, {
      from: filename
    }).css,
  processorOpts: { parser: require("postcss-less").parse },
  camelCase: true,
  generateScopedName: "[name]__[local]__[hash:base64:8]",
  resolve: {
    alias: {
      "@stylization": path.resolve(
        __dirname,
        "../client/styles/stylization.less"
      )
    }
  }
});
require("module-alias").addAliases({
  "@comps": path.resolve(__dirname, "../client/components"),
  "@uiComp": path.resolve(__dirname, "../client/components/uiComp"),
  "@logicComp": path.resolve(__dirname, "../client/components/logicComp"),
  "@Section": path.resolve(__dirname, "../client/Section"),
  "@ajax": path.resolve(__dirname, "../client/utils/ajax.js"),
  "@classNames": path.resolve(__dirname, "../client/utils/classNames.js"),
  "@redux": path.resolve(__dirname, "../client/redux"),
  "@Images": path.resolve(__dirname, "../client/Assets/Images"),
  "@JSON": path.resolve(__dirname, "../client/Assets/JSON")
});

// Image require hook
require("asset-require-hook")({
  name: "/[hash].[ext]",
  extensions: ["jpg", "png", "gif", "webp", "svg"],
  limit: 8000
});

const app = require("./app.js"),
  views = require("koa-views"),
  apiRoute = require("./routes/apiRoute"),
  viewRoute = require("./routes/viewRoute"),
  port = process.env.port || 80,
  convert = require("koa-convert"),
  webpack = require("webpack"),
  config = require("../build/webpack.dev.config"),
  compiler = webpack(config),
  devMiddleware = require("koa-webpack-dev-middleware"),
  hotMiddleware = require("koa-webpack-hot-middleware");
compiler.plugin("emit", (compilation, callback) => {
  const assets = compilation.assets;
  let file, data;
  Object.keys(assets).forEach(key => {
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
app.use(viewRoute);
app.use(apiRoute.routes());
app.use(apiRoute.allowedMethods());
app.use(
  convert(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  )
);
app.use(convert(hotMiddleware(compiler)));
app.listen(port);
