"use strict";
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, ".."),
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".less"],
    alias: {
      "@comps": path.resolve(__dirname, "../client/components"),
      "@uiComp": path.resolve(__dirname, "../client/components/uiComp"),
      "@logicComp": path.resolve(__dirname, "../client/components/logicComp"),
      "@Section": path.resolve(__dirname, "../client/Section"),
      "@utils": path.resolve(__dirname, "../client/utils"),

      "@styles": path.resolve(__dirname, "../client/styles"),

      "@redux": path.resolve(__dirname, "../client/redux"),

      "@Images": path.resolve(__dirname, "../client/Assets/Images"),
      "@JSON": path.resolve(__dirname, "../client/Assets/JSON"),
    },
  },
};
