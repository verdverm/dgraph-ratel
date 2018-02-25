const url = require('url');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = {
  builders: {
    web: {
      entry: './index.js',
      stack: ['react-native-web', 'web'],
      openBrowser: false,
      defines: {
        __CLIENT__: true
      },
      enabled: true
    },
    test: {
      stack: ['react-native-web', 'server'],
      roles: ['test'],
      defines: {
        __TEST__: true
      }
    }
  },
  options: {
    stack: ['react', 'styled-components', 'css', 'sass', 'less', 'es6', 'webpack'],
    cache: './cache',
    ssr: false,
    webpackDll: true,
    reactHotLoader: false,
    persistGraphQL: false,
    frontendRefreshOnBackendChange: true,
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
      __BACKEND_URL__: '"https://api.knowyourchicken.biz"'
    },
    webpackConfig: {
      plugins: [
				new CircularDependencyPlugin({
					// exclude detection of files based on a RegExp
					exclude: /a\.js|node_modules/,
					// add errors to webpack instead of warnings
					failOnError: false,
					// set the current working directory for displaying module paths
					cwd: process.cwd(),
				})
			],
      module: {
        loaders: [
          {
            test: /\.scss$/,
            loader: 'style!css!resolve-url!postcss-loader!sass',
            exclude: /node_modules/
          },
          { test: /\.json$/, use: 'json-loader' },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
              plugins: ['transform-runtime']
            }
          }

        ]
      }
    }
  }
};

config.options.devProxy = config.options.ssr;

if (process.env.NODE_ENV === 'production') {
  config.options.defines.__BACKEND_URL__ = '"https://apollo-universal-starter-kit.herokuapp.com/graphql"';
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false;
}

const extraDefines = {
  __SSR__: config.options.ssr,
  __PERSIST_GQL__: config.options.persistGraphQL
};

config.options.defines = Object.assign(config.options.defines, extraDefines);

module.exports = config;

