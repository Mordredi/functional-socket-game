'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const Task = require('data.task');
const path = require('path')

const server = require('./server');
const socket = require('./socket');
const socketEvents = require('./socketEvents');
const app = express();

app.set('port', 3000);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client')));

const main = new Task((rej, res) => {
  server(app);
  socket(app).fork(console.log, socketEvents)
  return app.listen(3000, err => 
    err ? rej(err) : res('Express: listening on 3000')
  )
})

main.fork(console.log, console.log)

