'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const Task = require('data.task');
const path = require('path')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const server = require('./server');
const socket = require('./socket');
const socketEvents = require('./socketEvents');
const webpackConfig = require('./webpack.config')

const app = express();
const compiler = webpack(webpackConfig)

app.set('port', 4500);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: {
    colors: true
  }
}))
app.use(webpackHotMiddleware(compiler))

const main = new Task((rej, res) => {
  server(app);
  socket(app).fork(console.log, socketEvents)
  return app.listen(4500, err => 
    err ? rej(err) : res('Express: listening on 3000')
  )
})

main.fork(console.log, console.log)

