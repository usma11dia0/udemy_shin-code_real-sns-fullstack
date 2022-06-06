//webpack.dev.jsとの変更点
//devtool削除、publickpath削除
//clean webpack plubinを追加　

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports= {
  mode: 'production',
  entry: './src/server.ts', //読み込み時のエントリーポイントを指定
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist'), //カレントディレクトリの絶対パス。 __dirname + '/dist' の意味。
  },
  module: {
    rules: [{
      test: /\.ts$/,  //コンパイル対象ファイルを正規表現で指定。
      use: 'ts-loader',
      exclude: /node_modules/  
    }]
  },
  resolve: {                  
    extensions:['.tsx','.ts', '.js'] //import時に拡張子が付いていなかった場合、配列内の左から順に補足
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
