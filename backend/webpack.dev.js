const path = require('path');
module.exports= {
  mode: 'development',
  entry: './src/server.ts', //読み込み時のエントリーポイントを指定
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist'), //カレントディレクトリの絶対パス。 __dirname + '/dist' の意味。
    publicPath: '/dist/' //webpack-dev-server使用時にメモリ上で作成されるbundleファイルの格納先
  },
  devtool: 'inline-source-map', //bundle前のoriginal sourceファイルを表示
  module: {
    rules: [{
      test: /\.tsx?$/,  //コンパイル対象ファイルを正規表現で指定。
      use: 'ts-loader',
      exclude: /node_modules/  
    }]
  },
  resolve: {                  
    extensions:['.tsx','.ts', '.js'] //import時に拡張子が付いていなかった場合、配列内の左から順に補足
  }
}
