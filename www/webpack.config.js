const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = (env, args) => {
  const merge = true;//env.production; // false
  const url = env.production ? 'https://unpkg.com' : '/node_modules';
  return {
    entry: {
      index: './src/index.tsx'
    },
    target: 'web',
    output: {
      path: path.join(__dirname),
      //publicPath: path.join(__dirname, '/assets/'),
      publicPath: env.production ? undefined : 'http://localhost/',
      filename: '[name].bundle.js',
      chunkFilename: '[id].bundle.js',
      pathinfo: false
    },
    mode: env.production ? 'production' : 'development',
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use:
            {
              loader: 'ts-loader',
              options: {
                experimentalWatchApi: true,
                transpileOnly: true //HMR doesn't work without this
              }
            }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(woff|woff2|png|jpg|svg|ico)$/,
          use:
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'//,
                //outputPath: '../cms/public'//path.join(__dirname, '../cms/public/resources')
              }
            }
        },
        {
          test: /\.(bin)$/,
          use: ['arraybuffer-loader']
        }
      ]
    },
    devtool: env.production ? undefined : 'cheap-module-eval-source-map',//devtool: 'source-map',
    externals: merge ? undefined : {
      'react': 'React',
      'react-dom': 'ReactDOM',
      //'react-dom/server': 'ReactDOMServer',
      'react-router-dom': 'ReactRouterDOM',
      'redux': 'Redux',
      'react-redux': 'ReactRedux',
      'history': 'History',

      'stackblur-canvas': 'StackBlur',
      'tinycolor2': 'tinycolor',

      '@material-ui/core': 'window["material-ui"]',
      'marked': 'marked',
      'ace-builds': 'ace',
      'scriptjs': '$script',
      'monaco-editor': 'window["monaco"]',

      'axios': 'axios',

      '@tensorflow/tfjs': 'tf'
    },
    plugins: [
      new webpack.WatchIgnorePlugin([
        /\.js$/,
        /\.d\.ts$/
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: `InkoSaga's Blog`,
        minify: true,
        favicon: path.join(__dirname, 'resources/favicon.ico'),//'favicon.ico',
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'app',
        scripts: merge ? undefined : [
          url + '/react/umd/react.production.min.js',
          url + '/react-dom/umd/react-dom.production.min.js',
          //url + '/react-dom/umd/react-dom-server.browser.production.min.js',
          url + '/react-router-dom/umd/react-router-dom.min.js',
          url + '/history/umd/history.min.js',
          url + '/redux/dist/redux.min.js',
          url + '/react-redux/dist/react-redux.min.js',

          url + '/stackblur-canvas/dist/stackblur.min.js',
          url + '/tinycolor2/dist/tinycolor-min.js',

          url + '/@material-ui/core/umd/material-ui.production.min.js',
          url + '/marked/marked.min.js',

          url + '/ace-builds/src-min/ace.js',
          //'/node_modules/monaco-editor/min/vs/loader.js',
          url + '/scriptjs/dist/script.min.js',

          url + '/axios/dist/axios.min.js',

          url + '/@tensorflow/tfjs/dist/tf.min.js'
        ],
        headHtmlSnippet: `
        <base href="/" />
        <meta name="viewport" content="width=device-width, height=device-height, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=0" />
        <meta http-equiv="Cache-control" content="public">
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124024770-1"></script>
      <script type="text/javascript">
      function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","UA-124024770-1");
      !function(i){if(i.search){var l={};i.search.slice(1).split("&").forEach(function(i){var a=i.split("=");l[a[0]]=a.slice(1).join("=").replace(/~and~/g,"&")}),void 0!==l.p&&window.history.replaceState(null,null,i.pathname.slice(0,-1)+(l.p||"")+(l.q?"?"+l.q:"")+i.hash)}}(window.location);
      </script>
        `,
        bodyHtmlSnippet: `
      
      `
      }),
      new ForkTsCheckerWebpackPlugin({
        watch: "./src/"
      }),
      new webpack.DefinePlugin({
        __API__: env.production ? '"https://cms.cocatiel.co"' : '"http://localhost:1337"'
      })
      //{
      //  apply: compiler =>
      //    compiler.hooks.watchRun.tap('JestWatchPlugin', compilation =>
      //      spawn('npm run test', [], { shell: true, cwd: process.cwd(), stdio: "inherit" })
      //    )
      //}
    ],
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /(node_modules)/
    },
    devServer: {
      port: 80,
      contentBase: path.join(__dirname),
      stats: 'errors-only',
      hot: true,
      historyApiFallback: {
        rewrites: [
          { from: /./, to: 'index.html' }
        ]
      }
    }
  }
};