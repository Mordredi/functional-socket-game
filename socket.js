const Task = require('data.task');
const expressWs = require('express-ws');

module.exports = (app) => {
  expressWs(app)

  return new Task((rej, res) => 
  app.ws('/', (ws, req) => {
    return res(ws)
  }))
}
