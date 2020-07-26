const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require( 'path' );
module.exports = {
   context: __dirname,
   entry: './src/index.jsx',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   resolve: {
      extensions: [".jsx", ".js"]
    },
   module: {
      rules: [
         {
            test:  /\.(js|mjs|jsx|ts|tsx)$/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif|ttf)?$/,
            use: 'file-loader'
         }
]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html'
      }),
      new MonacoWebpackPlugin()
   ]
};
