import path from ("path");
import { CleanWebpackPlugin } from ("clean-webpack-plugin");
import HtmlWebpackPlugin from ("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "src", "assets", "favicon.png"),
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
